<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 text-start">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :required="required"
      :value="internalValue"
      @input="onInput"
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 overflow-hidden text-ellipsis"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps<{
  modelValue: string | Date;
  label: string;
  type?: string;
  required?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const formatDate = (val: string): string => {
  return new Date(val).toISOString()?.split("T")[0] || "";
};

const internalValue = ref<string>(
  props.type === "date"
    ? formatDate(props.modelValue as string)
    : String(props.modelValue ?? "")
);

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal as string;
  }
);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  internalValue.value = target.value;
  emit("update:modelValue", target.value);
};
</script>

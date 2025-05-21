<template>
  <BaseDropdown
    v-model="model"
    :items="items"
    :item-label="getItemLabel"
    :item-key="getItemKey"
    :label="label"
    :id="id"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BaseDropdown from "@/components/Base/BaseDropdown.vue";
import { RequestEnum } from "@/enums/requestStatusEnum";

const props = defineProps<{
  modelValue?: RequestEnum;
  label?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: RequestEnum): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val as RequestEnum),
});

const items = Object.values(RequestEnum);

const getItemLabel = (item: RequestEnum) => {
  const map: Record<RequestEnum, string> = {
    [RequestEnum.PENDING]: "Pending",
    [RequestEnum.APPROVED]: "Approved",
    [RequestEnum.FINISHED]: "Finished",
    [RequestEnum.CANCELED]: "Canceled",
  };
  return map[item] ?? item;
};

const getItemKey = (item: RequestEnum) => item;
</script>

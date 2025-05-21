<template>
  <BaseDropdown
    v-model="internalValue"
    :label="label"
    :id="id"
    :items="donators"
    :itemLabel="(donator) => donator.name"
    :itemKey="(donator) => donator.id"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import BaseDropdown from "@/components/Base/BaseDropdown.vue";
import { Donator } from "@/types/donator";
import { donatorService } from "@/services/donatorService";

const props = defineProps<{
  modelValue?: string;
  label?: string;
  id?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const donators = ref<Donator[]>([]);
const internalValue = ref(props.modelValue || "");

onMounted(async () => {
  donators.value = await donatorService.getAll();
});

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val || "";
  }
);

watch(
  () => internalValue.value,
  (val) => {
    emit("update:modelValue", val);
  }
);
</script>

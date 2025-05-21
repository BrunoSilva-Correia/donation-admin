<template>
  <BaseDropdown
    v-model="internalValue"
    :label="label"
    :id="id"
    :items="beneficiaries"
    :itemLabel="(beneficiary) => beneficiary.name"
    :itemKey="(beneficiary) => beneficiary.id"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import BaseDropdown from "@/components/Base/BaseDropdown.vue";
import { Beneficiary } from "@/types/beneficiary";
import { beneficiaryService } from "@/services/beneficiaryService";

const props = defineProps<{
  modelValue?: string;
  label?: string;
  id?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const beneficiaries = ref<Beneficiary[]>([]);
const internalValue = ref(props.modelValue || "");

onMounted(async () => {
  beneficiaries.value = await beneficiaryService.getAll();
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

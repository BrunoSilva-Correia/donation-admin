<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <BaseInput
      v-model="form.name"
      label="Name"
      required
      id="beneficiary-name"
    />
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      required
      id="beneficiary-email"
    />
    <CitySelector v-model="form.location" label="City" id="beneficiary-city" />
    <BaseInput
      v-model="form.necessities"
      label="Necessities"
      required
      id="beneficiary-necessities"
    />
    <div class="text-right">
      <button
        type="submit"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import { CreateBeneficiaryDto } from "@/types/beneficiary";
import CitySelector from "@/components/Selectors/CitySelector.vue";

const props = defineProps<{
  modelValue?: CreateBeneficiaryDto | null;
  submitLabel?: string;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateBeneficiaryDto): void;
}>();

const form = ref<CreateBeneficiaryDto>({
  name: "",
  email: "",
  location: "",
  necessities: "",
  createdBy: localStorage.getItem("userId") ?? "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form.value, val);
  },
  { immediate: true }
);

const submitForm = () => {
  emit("submit", form.value);
};
</script>

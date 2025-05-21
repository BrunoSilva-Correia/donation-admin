<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <BaseInput
      v-model="form.description"
      label="Description"
      required
      id="donation-description"
    />
    <BaseInput
      v-model="form.expiryAt"
      label="Expiration Date"
      type="date"
      required
      id="donation-date"
    />
    <CitySelector v-model="form.location" label="City" id="donation-city" />
    <DonatorSelector
      v-model="form.donatorId"
      label="Donator"
      id="donation-donator"
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
import { CreateDonationDto } from "@/types/donation";
import CitySelector from "@/components/Selectors/CitySelector.vue";
import DonatorSelector from "@/components/Selectors/DonatorSelector.vue";

const props = defineProps<{
  modelValue?: CreateDonationDto | null;
  submitLabel?: string;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateDonationDto): void;
}>();

const form = ref<CreateDonationDto>({
  description: "",
  donatorId: "",
  location: "",
  expiryAt: new Date(),
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form.value, val);
  },
  { immediate: true }
);

const submitForm = () => {
  emit("submit", {
    ...form.value,
    expiryAt: new Date(form.value.expiryAt + "T09:00:00Z"),
  });
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <BeneficiarySelector
      v-model="form.beneficiaryId"
      label="Beneficiary"
      id="request-beneficiary"
    />
    <DonationSelector
      v-model="form.donationId"
      label="Donation"
      id="request-donation"
    />
    <RequestStatusSelector
      v-model="form.status"
      label="Status"
      id="request-status"
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
import { CreateRequestDto } from "@/types/request";
import BeneficiarySelector from "@/components/Selectors/BeneficiarySelector.vue";
import DonationSelector from "@/components/Selectors/DonationSelector.vue";
import RequestStatusSelector from "@/components/Selectors/RequestStatusSelector.vue";
import { RequestEnum } from "@/enums/requestStatusEnum";

const props = defineProps<{
  modelValue?: CreateRequestDto | null;
  submitLabel?: string;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateRequestDto): void;
}>();

const form = ref<CreateRequestDto>({
  donationId: "",
  beneficiaryId: "",
  status: RequestEnum.PENDING,
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
    // expiryAt: new Date(form.value.expiryAt + "T09:00:00Z"),
  });
};
</script>

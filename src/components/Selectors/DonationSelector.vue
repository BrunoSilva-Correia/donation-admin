<template>
  <BaseDropdown
    v-model="internalValue"
    :label="label"
    :id="id"
    :items="donations"
    :itemLabel="(donation) => donation.description"
    :itemKey="(donation) => donation.id"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import BaseDropdown from "@/components/Base/BaseDropdown.vue";
import { Donation } from "@/types/donation";
import { donationService } from "@/services/donationService";

const props = defineProps<{
  modelValue?: string;
  label?: string;
  id?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const donations = ref<Donation[]>([]);
const internalValue = ref(props.modelValue || "");

onMounted(async () => {
  donations.value = await donationService.getAll();
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

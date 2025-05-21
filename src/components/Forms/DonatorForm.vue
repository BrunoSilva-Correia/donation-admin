<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <BaseInput v-model="form.name" label="Name" required id="donator-name" />
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      required
      id="donator-email"
    />
    <BaseInput
      v-model="form.phone"
      label="Phone"
      required
      id="donator-phone"
      type="tel"
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
import { CreateDonatorDto } from "@/types/donator";
import BaseInput from "@/components/Base/BaseInput.vue";

const props = defineProps<{
  modelValue?: CreateDonatorDto | null;
  submitLabel?: string;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateDonatorDto): void;
}>();

const form = ref<CreateDonatorDto>({
  name: "",
  email: "",
  phone: "",
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

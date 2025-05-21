<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Donation</h2>
      <button
        @click="showForm = true"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        New Donation
      </button>
    </div>

    <div v-if="loading" class="text-gray-500">
      <CustomLoading />
    </div>

    <div
      v-else
      class="overflow-x-auto shadow rounded-lg border border-gray-200"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Description
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Expiration Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Location
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Donator
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="donation in donations" :key="donation.id">
            <BaseDataTd>
              {{ donation.description }}
            </BaseDataTd>
            <BaseDataTd>
              {{ new Date(donation.expiryAt).toLocaleDateString("en-US") }}
            </BaseDataTd>
            <BaseDataTd>
              {{ donation.location }}
            </BaseDataTd>
            <BaseDataTd>
              {{ getDonatorById(donation.donatorId) }}
            </BaseDataTd>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2"
            >
              <button
                @click="editDonation(donation)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                @click="removeDonation(donation.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade">
      <div
        v-if="showForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ selected?.description ? "Edit Donation" : "New Donation" }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <DonationForm
            :modelValue="selected"
            submitLabel="Save"
            @submit="handleSubmit"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  Donation,
  CreateDonationDto,
  UpdateDonationDto,
} from "@/types/donation";
import { donationService } from "@/services/donationService";
import DonationForm from "@/components/Forms/DonationForm.vue";
import { useToast } from "vue-toastification";
import BaseDataTd from "@/components/Base/BaseDataTd.vue";
import CustomLoading from "@/components/CustomLoading.vue";
import { Donator } from "@/types/donator";
import { donatorService } from "@/services/donatorService";

const toast = useToast();
const donations = ref<Donation[]>([]);
const loading = ref(false);
const showForm = ref(false);
const selected = ref<Donation | null>(null);
let donators: Donator[] = [];

const load = async () => {
  loading.value = true;
  try {
    donations.value = await donationService.getAll();
    donators = await donatorService.getAll();
  } catch (e) {
    toast.error("Error while loading donations.");
  } finally {
    loading.value = false;
  }
};

const getDonatorById = (id: string): string => {
  return donators.find((donator) => donator.id === id)?.name || "";
};

const closeModal = () => {
  showForm.value = false;
  selected.value = null;
};

const handleSubmit = async (data: CreateDonationDto) => {
  try {
    if (selected.value?.id) {
      const donation = donations.value.find((d) => d.id === selected.value?.id);
      if (donation) {
        const changed: UpdateDonationDto = {};
        const keys = Object.keys(data) as (keyof UpdateDonationDto)[];
        for (const key of keys) {
          if (donation[key] !== data[key]) {
            changed[key] = data[key] as string & Date;
          }
        }
        if (Object.keys(changed).length) {
          await donationService.update(donation.id, changed);
        }
        toast.success("Donation updated.");
      }
    } else {
      console.log(data);
      await donationService.create(data);
      toast.success("Donation created.");
    }
    showForm.value = false;
    selected.value = null;
    await load();
  } catch (error) {
    console.log(error);
  }
};

const editDonation = (donation: Donation) => {
  selected.value = { ...donation };
  showForm.value = true;
};

const removeDonation = async (id: string) => {
  if (confirm("Confirm remove action?")) {
    try {
      await donationService.delete(id);
      toast.success("Donation removed.");
      await load();
    } catch {
      toast.error("Error while removing donation.");
    }
  }
};

onMounted(load);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

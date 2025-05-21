<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Request</h2>
      <button
        @click="showForm = true"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        New Request
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
              Beneficiary
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Request
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="request in requests" :key="request.id">
            <BaseDataTd>
              {{ getBeneficiaryById(request.beneficiaryId) }}
            </BaseDataTd>
            <BaseDataTd>
              {{ getDonationById(request.donationId) }}
            </BaseDataTd>
            <BaseDataTd>
              {{ request.status }}
            </BaseDataTd>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2"
            >
              <button
                @click="editRequest(request)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                @click="removeRequest(request.id)"
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
              {{ selected?.id ? "Edit Request" : "New Request" }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <RequestForm
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
import { Request, CreateRequestDto, UpdateRequestDto } from "@/types/request";
import { requestService } from "@/services/requestService";
import RequestForm from "@/components/Forms/RequestForm.vue";
import { useToast } from "vue-toastification";
import BaseDataTd from "@/components/Base/BaseDataTd.vue";
import CustomLoading from "@/components/CustomLoading.vue";
import { Donation } from "@/types/donation";
import { Beneficiary } from "@/types/beneficiary";
import { beneficiaryService } from "@/services/beneficiaryService";
import { donationService } from "@/services/donationService";
import { RequestEnum } from "@/enums/requestStatusEnum";

const toast = useToast();
const requests = ref<Request[]>([]);
const loading = ref(false);
const showForm = ref(false);
const selected = ref<Request | null>(null);
let donations: Donation[] = [];
let beneficiaries: Beneficiary[] = [];

const load = async () => {
  loading.value = true;
  try {
    requests.value = await requestService.getAll();
    donations = await donationService.getAll();
    beneficiaries = await beneficiaryService.getAll();
  } catch (e) {
    toast.error("Error while loading requests.");
  } finally {
    loading.value = false;
  }
};

const getDonationById = (id: string): string => {
  return donations.find((donation) => donation.id === id)?.description || "";
};

const getBeneficiaryById = (id: string): string => {
  return beneficiaries.find((beneficiary) => beneficiary.id === id)?.name || "";
};

const closeModal = () => {
  showForm.value = false;
  selected.value = null;
};

const handleSubmit = async (data: CreateRequestDto) => {
  try {
    if (selected.value?.id) {
      const request = requests.value.find((d) => d.id === selected.value?.id);
      if (request) {
        const changed: UpdateRequestDto = {};
        const keys = Object.keys(data) as (keyof UpdateRequestDto)[];
        for (const key of keys) {
          if (request[key] !== data[key]) {
            changed[key] = data[key] as string & RequestEnum;
          }
        }
        if (Object.keys(changed).length) {
          await requestService.update(request.id, changed);
        }
        toast.success("Request updated.");
      }
    } else {
      console.log(data);
      await requestService.create(data);
      toast.success("Request created.");
    }
    showForm.value = false;
    selected.value = null;
    await load();
  } catch (error) {
    console.log(error);
  }
};

const editRequest = (request: Request) => {
  selected.value = { ...request };
  showForm.value = true;
};

const removeRequest = async (id: string) => {
  if (confirm("Confirm remove action?")) {
    try {
      await requestService.delete(id);
      toast.success("Request removed.");
      await load();
    } catch {
      toast.error("Error while removing request.");
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

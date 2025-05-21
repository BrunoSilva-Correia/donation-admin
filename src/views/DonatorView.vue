<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Donators</h2>
      <button
        @click="showForm = true"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        New Donator
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
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Phone
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="donator in donators" :key="donator.id">
            <BaseDataTd>
              {{ donator.name }}
            </BaseDataTd>
            <BaseDataTd>
              {{ donator.email }}
            </BaseDataTd>
            <BaseDataTd>
              {{ donator.phone }}
            </BaseDataTd>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2"
            >
              <button
                @click="editDonator(donator)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                @click="removeDonator(donator.id)"
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
              {{ selected?.email ? "Edit Donator" : "New Donator" }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <DonatorForm
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
import { Donator, CreateDonatorDto } from "@/types/donator";
import { donatorService } from "@/services/donatorService";
import DonatorForm from "@/components/Forms/DonatorForm.vue";
import { useToast } from "vue-toastification";
import BaseDataTd from "@/components/Base/BaseDataTd.vue";
import CustomLoading from "@/components/CustomLoading.vue";

const toast = useToast();
const donators = ref<Donator[]>([]);
const loading = ref(false);
const showForm = ref(false);
const selected = ref<CreateDonatorDto | null>(null);

const load = async () => {
  loading.value = true;
  try {
    donators.value = await donatorService.getAll();
  } catch (e) {
    toast.error("Error while loading donators.");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  showForm.value = false;
  selected.value = null;
};

const handleSubmit = async (data: CreateDonatorDto) => {
  try {
    if (selected.value?.email) {
      const donator = donators.value.find(
        (d) => d.email === selected.value?.email
      );
      if (donator) {
        const changed: Partial<CreateDonatorDto> = {};
        const keys = Object.keys(data) as (keyof CreateDonatorDto)[];
        for (const key of keys) {
          if (key === "createdBy") {
            continue;
          }
          if (donator[key] !== data[key]) {
            changed[key] = data[key];
          }
        }
        if (Object.keys(changed).length) {
          await donatorService.update(donator.id, changed);
        }
        toast.success("Donator updated.");
      }
    } else {
      console.log(data);
      await donatorService.create(data);
      toast.success("Donator created.");
    }
    showForm.value = false;
    selected.value = null;
    await load();
  } catch (error) {
    console.log(error);
  }
};

const editDonator = (donator: Donator) => {
  selected.value = { ...donator };
  showForm.value = true;
};

const removeDonator = async (id: string) => {
  if (confirm("Confirm remove action?")) {
    try {
      await donatorService.delete(id);
      toast.success("Donator removed.");
      await load();
    } catch {
      toast.error("Error while removing donator.");
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

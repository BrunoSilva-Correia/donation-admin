<template>
  <BaseDropdown
    v-model="internalValue"
    :label="label"
    :id="id"
    :items="cities"
    :itemLabel="(city) => city.name"
    :itemKey="(city) => city.name"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import BaseDropdown from "@/components/Base/BaseDropdown.vue";

const props = defineProps<{
  modelValue?: string;
  label?: string;
  id?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const cities = ref<{ id: number; name: string }[]>([]);
const internalValue = ref(props.modelValue || "");

type City = {
  id: string;
  nome: string;
};

onMounted(async () => {
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
  );
  const data = await res.json();
  cities.value = data.map((item: City) => ({
    id: item.id,
    name: item.nome,
  }));
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

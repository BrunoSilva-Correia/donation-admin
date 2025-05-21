<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700 text-start">
      {{ label }}
    </label>

    <input
      :id="id"
      type="text"
      v-model="search"
      @input="onSearchInput"
      @focus="onFocus"
      class="w-full px-3 py-2 border border-gray-300 rounded-md"
    />

    <ul
      v-if="filteredItems.length && search"
      class="border border-gray-200 rounded-md bg-white max-h-48 overflow-y-auto"
    >
      <li
        v-for="item in filteredItems"
        :key="getItemKey(item)"
        @click="selectItem(item)"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ getItemLabel(item) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from "vue";

const props = defineProps<{
  modelValue?: string;
  id?: string;
  label?: string;
  items: any[];
  itemLabel: (item: any) => string;
  itemKey: (item: any) => string | number;
}>();

const emit = defineEmits(["update:modelValue"]);

const { modelValue, items, itemLabel, itemKey } = toRefs(props);

const search = ref("");
const filteredItems = ref<any[]>([]);

const getItemLabel = (item: any) => itemLabel.value(item);
const getItemKey = (item: any) => itemKey.value(item);

const updateSearchFromModelValue = () => {
  if (modelValue.value && items.value.length) {
    const selected = items.value.find(
      (item) => getItemKey(item) === modelValue.value
    );
    search.value = selected ? getItemLabel(selected) : "";
  } else {
    search.value = "";
  }
};

watch([modelValue, items], updateSearchFromModelValue, { immediate: true });

const onSearchInput = () => {
  const term = search.value.toLowerCase();
  filteredItems.value = items.value.filter((item) =>
    getItemLabel(item).toLowerCase().includes(term)
  );
};

const onFocus = () => {
  filteredItems.value = items.value;
};

const selectItem = (item: any) => {
  search.value = getItemLabel(item);
  filteredItems.value = [];
  emit("update:modelValue", getItemKey(item));
};
</script>

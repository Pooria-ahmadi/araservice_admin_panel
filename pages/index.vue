<template>
  <div>
    <LayoutsNavbar />
    <LayoutsSidebar />
    <div class="flex justify-end min-h-screen bg-gray-100">
      <div class="w-11/12 bg-white rounded-lg shadow-lg md:ml-8 mt-4">
        <Tabs v-model:value="tabStore.activeTab">
          <TabList class="bg-gray-100">
            <Tab v-for="(tab, index) in tabStore.tabs" :value="tab.id" :key="tab.id" as="div"
              class="flex items-center gap-2">
              <button @click="tabStore.removeTab(tab.id)"
                class="mr-2 h-4 w-4 flex items-center justify-center text-xs rounded-full hover:bg-red-400 hover:text-white transition duration-200">
                ✖
              </button>
              <span class="ml-2 text-xs p-0 m-0"> {{ tab.id }} {{ tab.menu }}</span>
            </Tab>
          </TabList>
          <TabPanels>
            <keep-alive>
              <TabPanel v-for="(tab, index) in tabStore.tabs" :value="tab.id" :key="tab.id" as="p" class="m-0">
                <component :menu="tab" :record="tab.record" :is="getComponent(tab.component)"
                  v-if="getComponent(tab.component)" />
              </TabPanel>
            </keep-alive>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useTabsStore } from '@/stores/tabs';
import { shallowRef } from 'vue';

const allComponents = import.meta.glob('@/components/**/*.vue');
const tabStore = useTabsStore();
const loadedComponents = shallowRef({});

definePageMeta({
  middleware: 'auth'
});

const getComponent = (componentName) => {
  if (!componentName) return null;
  if (!loadedComponents.value[componentName]) {
    loadedComponents.value[componentName] = defineAsyncComponent(allComponents[`/components/${componentName}.vue`]);
  }
  return loadedComponents.value[componentName];
};
</script>

<style>
.p-tab {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.2rem 0.125rem !important;
  font-weight: 100 !important;
  background-color: #EAEAEA !important;
  color: #a7a7a7 !important;
}

.p-tab-active {
  border-color: white !important;
  background-color: #ffffff !important;
  color: #0e005d !important;
  border: none !important;
}

.p-tablist-active-bar {
  border-color: white !important;
  border: none !important;
}

.p-tablist-tab-list {
  background: none !important;
}
</style>
<template>
  <div>
    <LayoutsSidebarMenu />
    <div class="flex justify-end min-h-screen bg-gray-100">
      <div class="w-11/12 bg-white p-6 rounded-lg shadow-lg md:ml-4 mt-8">
        <Tabs value="0">
          <TabList>
            <Tab v-for="(tab, index) in tabStore.tabs" :value="tab.value" :key="tab.title" as="div"
              class="flex items-center gap-2">
              <span class="mr-2 text-xs p-0 m-0">{{ tab.title }}</span>
              <button @click.stop="closeTab(tab.pk_menu, index)"
                class="w-6 h-6 flex items-center justify-center text-xs rounded-full hover:bg-red-100 transition duration-200">
                ✖
              </button>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="(tab, index) in tabStore.tabs" :value="tab.value" :key="tab.component" as="p" class="m-0">
              <component :is="getComponent(tab.component)" v-if="getComponent(tab.component)" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});

import { defineAsyncComponent, ref } from 'vue';
import { useTabsStore } from '@/stores/tabs';

const allComponents = import.meta.glob('@/components/**/*.vue');

const tabStore = useTabsStore();
const activeTabIndex = ref(0);

const getComponent = (componentName) => {
  if (!componentName || !allComponents[`/components/${componentName}.vue`]) return null;
  return defineAsyncComponent(allComponents[`/components/${componentName}.vue`]);
};

const closeTab = (tabId, index) => {
  tabStore.removeTab(tabId);
  if (tabStore.tabs.length > 0) {
    activeTabIndex.value = index === 0 ? 0 : index - 1;
  } else {
    activeTabIndex.value = 0;
  }
};
</script>

<style>
.p-tab {
  padding: 0.2rem 0.125rem !important;
  font-weight: 100 !important;
}
</style>
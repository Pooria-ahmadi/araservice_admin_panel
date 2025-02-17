<template>
  <div>
    <LayoutsNavbar />
    <LayoutsSidebar />
    <div class="flex justify-end min-h-screen bg-gray-100">
      <div class="w-11/12 bg-white rounded-lg shadow-lg md:ml-4 mt-4">
        <Tabs value="0">
          <TabList class="bg-gray-100">
            <Tab v-for="(tab, index) in tabStore.tabs" :value="tab.value" :key="tab.title" as="div"
              class="flex items-center gap-2">
              <button @click.stop="closeTab(tab.pk_menu, index)"
                class="mr-2 h-6 flex items-center justify-center text-xs rounded-full transition duration-200">
                ✖
              </button>
              <span class="ml-2 text-xs p-0 m-0">{{ tab.title }}</span>
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
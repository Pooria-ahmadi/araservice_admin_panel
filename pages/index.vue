<template>
  <div>
    <Toast />
    <SidebarMenu />
    <div class="flex justify-end min-h-screen bg-gray-100">
      <div class="w-11/12 bg-white p-6 rounded-lg shadow-lg md:ml-4 mt-8">
        <TabView v-model:activeIndex="activeTabIndex">
          <TabPanel v-for="(tab, index) in store.tabs" :key="tab.id">
            <template #header>
              <div class="flex items-center">
                <span class="mr-2">{{ tab.title }}</span>
                <button 
                @click.stop="closeTab(tab.id, index)" 
                  class="w-6 h-6 flex items-center justify-center text-xs rounded-full hover:bg-red-100 transition duration-200"
                >
                  ✖
                </button>
              </div>
            </template>
            <component :is="getComponent(tab.component)" v-if="getComponent(tab.component)" />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useTabsStore } from '@/stores/tabs';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const allComponents = import.meta.glob('@/components/**/*.vue');

const store = useTabsStore();
const activeTabIndex = ref(0);

const getComponent = (componentName) => {
  if (!componentName || !allComponents[`/components/${componentName}.vue`]) return null;
  return defineAsyncComponent(allComponents[`/components/${componentName}.vue`]);
};

const closeTab = (tabId, index) => {
  store.removeTab(tabId);
  if (store.tabs.length > 0) {
    activeTabIndex.value = index === 0 ? 0 : index - 1;
  } else {
    activeTabIndex.value = 0;
  }
};
</script>

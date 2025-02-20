<template>
  <div class="relative hidden lg:block z-[1020]">
    <div
      class="fixed z-10 right-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 flex flex-col items-center py-4"
      :class="visible ? 'w-64' : 'w-20'">
      <button @click="toggleSidebar"
        class="absolute left-0 mt-10 -translate-x-1/2 bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full shadow-md">
        <Icon class="text-white" :name="visible ? 'uil:angle-left' : 'uil:angle-right'" />
      </button>
      <div class="flex flex-col items-center justify-center w-full mt-6">
        <div v-if="visible">
          <img src="/layout/logo.png" alt="" class="mx-auto">
          <div class="mt-6">
            <IconField>
              <InputIcon>
                <Icon name="uil:search" style="font-size: 16px;" />
              </InputIcon>
              <InputText :placeholder="$t('menu_search')" />
            </IconField>
          </div>
          <Accordion value="0">
            <AccordionPanel v-for="parentMenu in parentMenus" :key="parentMenu.title" :value="parentMenu.value">
              <AccordionHeader>{{ parentMenu.menu }}</AccordionHeader>
              <AccordionContent>
                <div class="flex pb-2 text-gray-600" v-for="menu in parentMenu.menus" @click="openTab(menu)">
                  <div class="pt-1">
                    <Icon :name="menu.icon" style="font-size: 16px;" />
                  </div>
                  <p class="m-0 mr-2 cursor-pointer">
                    {{ menu.menu }}
                  </p>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
        <div v-else>
          <img class="w-12 ml-4 mt-1" src="/layout/logosidebar.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app';
import { useTabsStore } from '@/stores/tabs';

const { $accapi } = useNuxtApp();
const tabStore = useTabsStore();
const visible = ref(false);
const parentMenus = ref([]);

const getMenus = async () => {
  try {
    const { data } = await $accapi.get('auth-user-menus');
    const structuredMenus = data.reduce((acc, item) => {
      if (item.menulevel === 1)
        acc.push({ ...item, menus: data.filter(sub => sub.menulevel === 2 && sub.fk_menu === item.pk_menu) });
      return acc;
    }, []);
    parentMenus.value = structuredMenus;
  } catch (error) {
    console.error('Error fetching menus:', error);
  }
};

const toggleSidebar = () => (visible.value = !visible.value);

const openTab = (menu) => {
  tabStore.addTab(menu);
  toggleSidebar()
};

onMounted(getMenus);
</script>
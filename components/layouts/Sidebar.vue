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
          <div class="relative mt-6">
            <Icon class="absolute z-[10] left-2 top-3" name="uil:search" style="font-size: 16px;" />
            <FloatLabel variant="on">
              <InputText id="on_label">
              </InputText>
              <label for="on_label">{{ $t('menu_search') }}</label>
            </FloatLabel>
          </div>
          <Accordion value="0">
            <AccordionPanel v-for="menu in menus" :key="menu.title" :value="menu.value">
              <AccordionHeader>{{ menu.menu }}</AccordionHeader>
              <AccordionContent>
                <div class="flex pb-2 text-gray-600" v-for="submenu in menu.submenus"
                  @click="openTab(submenu.pk_menu, submenu.menu, submenu.component)">
                  <div class="pt-1">
                    <Icon :name="submenu.icon" style="font-size: 16px;" />
                  </div>
                  <p class="m-0 mr-2 cursor-pointer">
                    {{ submenu.menu }}
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
const visible = ref(false);

const menus = ref([
  {
    menu: 'پذیرش',
    value: '0',
    pk_menu: 1,
    submenus: [
      {
        pk_menu: '1',
        icon: 'uil:plus-circle',
        menu: 'پذیرش جدید',
        component: 'modules/homeease/acceptance/Acceptance',
      },
      {
        pk_menu: '2',
        menu: 'پذیرش ها',
        icon: 'uil:list-ul',
        component: 'modules/homeease/acceptance/List',
      },
    ],
  },
]);

const toggleSidebar = () => {
  visible.value = !visible.value;
};

import { useTabsStore } from '@/stores/tabs';

const storeTab = useTabsStore();
const openTab = (pk_menu, title, component) => {
  storeTab.addTab({ 'pk_menu': pk_menu, 'title': title, 'component': component });
  toggleSidebar()
};
</script>
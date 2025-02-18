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
import { ref } from 'vue'
import { useNuxtApp } from '#app';
import { useTabsStore } from '@/stores/tabs';

const { $accapi } = useNuxtApp();

const storeTab = useTabsStore();
const visible = ref(false);
const menus = ref([]);
const submenus = ref([])

const getMenus = async () => {
  try {
    const response = await $accapi.get('auth-user-menus');
    response.data.forEach(element => {
      if (element.menulevel == 1) {
        element.submenus = [];
        response.data.forEach(subelement => {
          if (subelement.menulevel == 2 && subelement.fk_menu == element.pk_menu) {
            element.submenus.push(subelement)
          }
        });

        menus.value.push(element)
      }
    });
    console.log(menus)

  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}

const toggleSidebar = () => {
  visible.value = !visible.value;
};


const openTab = (pk_menu, title, component) => {
  storeTab.addTab({ 'pk_menu': pk_menu, 'title': title, 'component': component });
  toggleSidebar()
};

onMounted(() => {
  getMenus()
})
</script>
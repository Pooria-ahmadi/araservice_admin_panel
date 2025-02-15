<template>
  <div class="relative hidden lg:block" style="z-index:1020;">
    <div
      class="fixed z-10 right-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 flex flex-col items-center py-4"
      :class="visible ? 'w-64' : 'w-20'">
      <button @click="toggleSidebar"
        class="absolute left-0 mt-10 -translate-x-1/2 bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full shadow-md">
        <img :src="visible ? '/layout/Left.png' : '/layout/right.png'" />
      </button>
      <div class="flex flex-col items-center justify-center w-full mt-6">
        <div v-if="visible">
          <img src="/layout/logo.png" alt="" class="mx-auto">
          <form>
            <div class="relative">
              <div class="absolute inset-y-0 end-6 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 dark:text-sky-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search" dir="rtl"
                class="block w-full py-3 mt-10 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50"
                placeholder="جستجو کنید..." required />
            </div>
          </form>
          <NuxtLink to="/" class="flex py-3 bg-sky-100 mt-10 pr-6 rounded-xl" dir="rtl">
            <p class="pr-2">
              داشبورد
            </p>
          </NuxtLink>
          <div @click="openTab('modules/homeease/acceptance/Acceptance', 'پذیرش جدید')" class="flex py-3 bg-sky-100 mt-4 pr-6 rounded-xl" dir="rtl">
            <p class="pr-2">
              ثبت پذیرش
            </p>
          </div>
        </div>
        <div v-else>
          <img src="/layout/logosidebar.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const visible = ref(false);


const toggleSidebar = () => {
  visible.value = !visible.value;
};

import { useTabsStore } from '@/stores/tabs';

const store = useTabsStore();
const openTab = (id, title) => {
  store.addTab({ id, title, component: id });
  toggleSidebar()
};
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-5/6 bg-white p-6 rounded-lg shadow-lg md:mr-28">

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center w-80">
            <p class="text-gray-500">داشبورد</p>
            <img src="/Icon.png" alt="" class="mx-4 w-3 h-3">
            <p class="text-black font-bold">پذیرش جدید</p>
          </div>
          <div class="text-center text-sm text-gray-500 md:w-48">تاریخ پذریرش: جمعه 21 دی 1403</div>
          <div class="text-center text-sm text-gray-500 md:w-40">ساعت پذریرش: 14:25</div>
          <div class="text-center text-sm text-gray-500">صادر کننده پذیرش: خانم شعبانی</div>
          <div class="text-center text-sm text-gray-500">شماره پذیرش: 38117</div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_technician" :suggestions="items" @complete="search" size="small"
                dropdown class="w-full" />
              <label for="on_label">تکنسین</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_Customer" :suggestions="items" @complete="search" size="small" dropdown
                class="w-full" />
              <label for="on_label">مشتری</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_devictype" :suggestions="items" @complete="search" size="small"
                dropdown class="w-full" />
              <label for="on_label">نوع دستگاه</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small"
                dropdown class="w-full" />
              <label for="on_label">برند دستگاه</label>
            </FloatLabel>
          </div>
          <div class=" flex justify-center">
            <div
              class="w-8 h-8 flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
              +
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4 mt-6">
          <div>
            <FloatLabel variant="on">
              <AutoComplete class="custom-autocomplete w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">استان</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on">
              <AutoComplete class="custom-autocomplete w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">شهرستان</label>
            </FloatLabel>
          </div>
        </div>
        <FloatLabel variant="on" class="mt-6">
          <InputText id="on_label" v-model="value3" class="w-full" />
          <label for="on_label">جستجو</label>
        </FloatLabel>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete class="w-full custom-autocomplete " v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">نام دستگاه</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete class="custom-autocomplete w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">مارک دستگاه</label>
            </FloatLabel>
          </div>

          <div class="md:w-80">
            <FloatLabel variant="on">
              <AutoComplete class="custom-autocomplete w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">مدل دستگاه</label>
            </FloatLabel>
          </div>
          <div class="flex items-center border rounded-xl text-center border-gray-500 w-24">
            <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">گارانتی</label>
            <input id="vue-checkbox-list" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <div class="md:w-1/3">
            <FloatLabel variant="on">
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">سرویس کار</label>
            </FloatLabel>
          </div>
          <div class="md:w-2/3">
            <FloatLabel variant="on">
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">روش ارسال پذیرش به سرویسکار</label>
            </FloatLabel>
          </div>
          <div class="md:w-1/3">
            <FloatLabel variant="on">
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">نوع سرویس</label>
            </FloatLabel>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-6 items-center">
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="value3" class="w-full h-24" />
              <label for="on_label">توضیحات </label>
            </FloatLabel>ّ
          </div>
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel variant="on">
              <InputText id="on_label" v-model="value3" class="w-full h-24" />
              <label for="on_label">توضیحات </label>
            </FloatLabel>ّ
          </div>

          <div class="">
            <div
              class="w-12 h-10 flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
              <img src="/Microphone 1.png" alt="">
            </div>
          </div>

          <div class="w-80 text-white  text-center">
            <button @click="submitForm" class="w-full flex justify-center bg-green-500 shadow-lg shadow-green-500/50  text-white py-2 rounded">
              <img src="/Vector.png" alt="" class="ml-2">
              <p>
                ثبت پذیرش
              </p>      
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>

const formData = ref({
  Fk_technician: "",
  Fk_Customer: "",
  Fk_devictype: "",
  Fk_device_brand: ""
});

const submitForm = async () => {
  try {
    console.log("📌 ارسال اطلاعات:", formData.value);

    const response = await axios.post("", formData.value);

    console.log("✅ پاسخ API:", response.data);
    alert("اطلاعات با موفقیت ارسال شد!");
  } catch (error) {
    console.error("❌ خطا در ارسال اطلاعات:", error);
    alert("ارسال اطلاعات ناموفق بود!");
  }
};
</script>

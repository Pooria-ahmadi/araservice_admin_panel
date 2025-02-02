<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-5/6 bg-white p-6 rounded-lg shadow-lg mr-28">

        <div class="grid grid-cols-3 gap-2">
          <div class="flex items-center w-64">
            <p class="text-gray-500">داشبورد</p>
            <img src="/Icon.png" alt="" class="mx-4 w-3 h-3">
            <p class="text-black font-bold">پذیرش جدید</p>
          </div>
          <div></div>
          <div class="text-center text-sm text-gray-500">تاریخ پذریرش: جمعه 21 دی 1403</div>
          <div class="text-center text-sm text-gray-500">ساعت پذریرش: 14:25</div>
          <div class="text-center text-sm text-gray-500">صادر کننده پذیرش: خانم شعبانی</div>
          <div class="text-center text-sm text-gray-500">شماره پذیرش: 38117</div>
        </div>
        <div class="grid grid-cols-5 gap-4 items-center my-10">
  <!-- ستون‌های ورودی -->
  <div class="col-span-1">
    <FloatLabel variant="on">
      <AutoComplete v-model="formData.Fk_technician" :suggestions="items" @complete="search" size="small" dropdown class="w-full" />
      <label for="on_label">تکنسین</label>
    </FloatLabel>
  </div>
  <div class="col-span-1">
    <FloatLabel variant="on">
      <AutoComplete v-model="formData.Fk_Customer" :suggestions="items" @complete="search" size="small" dropdown class="w-full" />
      <label for="on_label">مشتری</label>
    </FloatLabel>
  </div>
  <div class="col-span-1">
    <FloatLabel variant="on">
      <AutoComplete v-model="formData.Fk_devictype" :suggestions="items" @complete="search" size="small" dropdown class="w-full" />
      <label for="on_label">نوع دستگاه</label>
    </FloatLabel>
  </div>
  <div class="col-span-1">
    <FloatLabel variant="on">
      <AutoComplete v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small" dropdown class="w-full" />
      <label for="on_label">برند دستگاه</label>
    </FloatLabel>
  </div>
  
  <!-- دکمه "+" کوچکتر -->
  <div class="col-span-1 flex justify-center">
    <div class="w-8 h-8 flex justify-center items-center rounded-lg bg-sky-700 text-white text-lg cursor-pointer">
      +
    </div>
  </div>
</div>
        <div class="grid grid-cols-2 gap-x-4" >
          <div>
            <FloatLabel variant="on">
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small" dropdown />
              <label for="on_label">استان</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on" >
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small" dropdown />
              <label for="on_label">شهرستان</label>
            </FloatLabel>
          </div>
        </div>
        <FloatLabel variant="on" class>
      <AutoComplete v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small" dropdown class="w-full" />
      <label for="on_label">برند دستگاه</label>
    </FloatLabel>

        <!-- دکمه ارسال -->
        <div class="mt-6">
          <button 
            @click="submitForm"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            ارسال اطلاعات
          </button>
        </div>

      </div>
    </div>

  </div>
</template>
<script setup>


// متغیرهای مدل ورودی‌ها
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
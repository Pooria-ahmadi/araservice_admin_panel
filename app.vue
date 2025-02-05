<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-5/6 bg-white p-6 rounded-lg shadow-lg mr-28">

        <div class="grid grid-cols-5 ">
          <div class="flex items-center ">
            <p class="text-gray-500">داشبورد</p>
            <img src="/Icon.png" alt="" class="mx-4 w-3 h-3">
            <p class="text-black font-bold">پذیرش جدید</p>
          </div>
          <div class="text-center text-sm text-gray-500">تاریخ پذریرش: جمعه 21 دی 1403</div>
          <div class="text-center text-sm text-gray-500">ساعت پذریرش: 14:25</div>
          <div class="text-center text-sm text-gray-500">صادر کننده پذیرش: خانم شعبانی</div>
          <div class="text-center text-sm text-gray-500">شماره پذیرش: 38117</div>
        </div>
        <div class="grid grid-cols-5 gap-4 items-center my-10">
          <div class="col-span-1">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_technician" :suggestions="items" @complete="search" size="small"
                dropdown class="custom-autocomplete" />
              <label for="on_label">تکنسین</label>
            </FloatLabel>
          </div>
          <div class="col-span-1">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_Customer" :suggestions="items" @complete="search" size="small" dropdown
                class="custom-autocomplete" />
              <label for="on_label">مشتری</label>
            </FloatLabel>
          </div>
          <div class="col-span-1">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_devictype" :suggestions="items" @complete="search" size="small"
                dropdown class="custom-autocomplete" />
              <label for="on_label">نوع دستگاه</label>
            </FloatLabel>
          </div>
          <div class="col-span-1">
            <FloatLabel variant="on">
              <AutoComplete v-model="formData.Fk_device_brand" :suggestions="items" @complete="search" size="small"
                dropdown class="custom-autocomplete" />
              <label for="on_label">برند دستگاه</label>
            </FloatLabel>
          </div>
          <div class="col-span-1 flex justify-center">
            <div
              class="w-8 h-8 flex justify-center items-center rounded-lg bg-sky-700 text-white text-lg cursor-pointer">
              +
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4">
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
        <FloatLabel variant="on" class="custom-input">
          <InputText id="on_label" v-model="value3" class="w-full" />
          <label for="on_label">جستجو</label>
        </FloatLabel>
        <div class="grid grid-cols-4 gap-x-4">
          <div>
            <FloatLabel variant="on">
              <AutoComplete class="w-full custom-autocomplete " v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="search" size="small" dropdown />
              <label for="on_label">استان</label>
            </FloatLabel>
          </div>
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
          <div class="flex items-center border rounded-xl text-center border-gray-500 w-24">
            <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">گارانتی</label>
            <input id="vue-checkbox-list" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4">
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

        <FloatLabel variant="on">
          <InputText id="on_label" v-model="value3" />
          <label for="on_label">On Label</label>
        </FloatLabel>
        <div class="mt-6">
          <button @click="submitForm" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            ارسال اطلاعات
          </button>
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
<style>
.custom-input .p-inputtext {
  background-color: white !important;
  color: black !important;
  /* برای خوانایی بهتر */
}

.custom-autocomplete .p-inputtext {
  background-color: white !important;
  color: rgb(31, 31, 31) !important;
}

.custom-autocomplete .p-autocomplete {
  background-color: white !important;
}

.custom-autocomplete .p-autocomplete .p-inputtext {
  background-color: white !important;
  color: rgb(54, 54, 54) !important;
}

.custom-autocomplete .p-autocomplete-dropdown {
  background-color: white !important;
  color: black !important;
  border-left: 1px solid #ccc;
}

.custom-autocomplete .p-autocomplete-dropdown .pi {
  color: black !important;
}
</style>
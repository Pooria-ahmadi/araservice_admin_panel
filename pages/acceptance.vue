<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-5/6 bg-white p-6 rounded-lg shadow-lg md:mr-28">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center w-80">
            <p>داشبورد</p>
            <img src="/Icon.png" alt="" class="mx-4 w-3 h-3">
            <p class="text-black font-bold">پذیرش جدید</p>
          </div>
          <div class="text-center text-sm md:w-48">تاریخ پذریرش: جمعه 21 دی 1403</div>
          <div class="text-center text-sm md:w-40">ساعت پذریرش: 14:25</div>
          <div class="text-center text-sm">صادر کننده: خانم شعبانی</div>
          <div class="text-center text-sm">شماره پذیرش: 38117</div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7">
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.customerfullname" />
              <label for="over_label">مشتری</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.phone" />
              <label for="over_label">شماره تلفن</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.mobile" />
              <label for="over_label">شماره موبایل</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.subscriptionid"
                @input="searchInUsers" />
              <label for="over_label">کد اشتراک</label>
            </FloatLabel>
          </div>
          <div class=" flex justify-center">
            <div
              class="w-8 h-7 pb-1 mt-1 px-1 flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
              +
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="absolute z-10 bg-white border rounded-2xl text-sm font-thin user-search-box hidden"
            ref="seacharea">
            <div v-for="(item, index) in userSearchResault" @click="selectSearchedUser">
              <div class="flex flex-col md:flex-row gap-4 py-3">
                <div class="md:w-80 mt-3">
                  {{ item.customerfullname }}
                </div>
                <div class="md:w-80 mt-3">
                  {{ item.mobile }}
                </div>
                <div class="md:w-80 mt-3">
                  {{ item.phone }}
                </div>
                <div class="md:w-80 mt-3">
                  {{ item.subscriptionid }}
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4 mt-7">
          <div>
            <FloatLabel>
              <Select size="small" class="w-full" v-model="activeProvince" :options="provinces" @Change="selectProvince"
                optionLabel="province" />
              <label for="on_label">استان</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel>
              <Select size="small" class="w-full" v-model="activeCity" :options="cities" @Change="selectCity"
                optionLabel="city" />
              <label for="on_label">شهر</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.fk_useraddress" />
              <label for="over_label">آدرس</label>
            </FloatLabel>
          </div>
        </div>
        <FloatLabel>
          <AutoComplete v-model="selected" :suggestions="searchedResponse" fluid size="small" class="mt-7"
            optionLabel="address" @complete="searchAddress" field="title" @item-select="handleSelect">
          </AutoComplete>
          <label for="on_label">جستجو در محله ها و مناطق</label>
        </FloatLabel>
        <MapView />
        <div class="flex flex-col md:flex-row gap-4 mt-7">
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.fk_elementcategory" />
              <label for="over_label">برند دستگاه</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.fk_elemet" />
              <label for="over_label">نوع دستگاه</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <AutoComplete class="w-full" v-model="formData.fk_subelement" :suggestions="items" @complete="autoSearch"
                size="small" dropdown />
              <label for="on_label">مدل دستگاه</label>
            </FloatLabel>
          </div>
          <div class="flex items-center border rounded-xl text-center border-gray-500 w-24">
            <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">گارانتی</label>
            <input id="vue-checkbox-list" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7">
          <div class="md:w-1/3">
            <FloatLabel>
              <Select size="small" class="w-full" v-model="activeReceptiontype" :options="receptiontypes"
                @Change="selectReceptiontype" optionLabel="receptiontype" />
              <label for="on_label">نوع سرویس</label>
            </FloatLabel>
          </div>
          <div class="md:w-1/3">
            <FloatLabel>
              <Select size="small" class="w-full" v-model="activeTechnicianselecttype"
                @change="selectTechnicianselecttype" :options="technicianselecttypes"
                optionLabel="technicianselecttype" />
              <label for="on_label">روش انتخاب سرویسکار</label>
            </FloatLabel>
          </div>
          <div class="md:w-1/3">
            <FloatLabel>
              <AutoComplete class="w-full" v-model="formData.Fk_device_brand" :suggestions="items"
                @complete="autoSearch" size="small" dropdown />
              <label for="on_label">سرویس کار</label>
            </FloatLabel>
          </div>

        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7 items-center">
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel>
              <InputText size="small" id="on_label" v-model="value3" class="w-full h-24" />
              <label for="on_label">مشکل</label>
            </FloatLabel>ّ
          </div>
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel>
              <InputText size="small" id="on_label" v-model="value3" class="w-full h-24" />
              <label for="on_label">توضیحات اپراتور</label>
            </FloatLabel>ّ
          </div>
          <div>
            <div
              class="w-12 h-10 flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
              <img src="/Microphone 1.png" alt="">
            </div>
          </div>
          <div class="w-80 text-white  text-center">
            <button @click="submitForm"
              class="w-full flex justify-center bg-green-500 shadow-lg shadow-green-500/50  text-white py-2 rounded">
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
import { useNuxtApp } from '#app';
import { ref, onMounted, toRaw } from 'vue'

const { $servapi } = useNuxtApp();

const seacharea = ref(null)

const technicianselecttypes = ref([
  {
    'pk_technicianselecttype': 1,
    'technicianselecttype': 'دستی',
  },
  {
    'pk_technicianselecttype': 2,
    'technicianselecttype': 'اتوماتیک',
  },
])
const receptiontypes = ref([
  {
    'pk_receptiontype': 1,
    'receptiontype': 'معمولی',
  },
  {
    'pk_receptiontype': 2,
    'receptiontype': 'بازگشتی',
  },
  {
    'pk_receptiontype': 3,
    'receptiontype': 'طلایی',
  }
])
const formData = ref({
  fk_receptiontype: '',
  fk_technicianselecttype: '',
});

const userSearchResault = ref([])
const provinces = ref([])
const cities = ref([])

const activeReceptiontype = ref(receptiontypes.value[0])
const activeTechnicianselecttype = ref(technicianselecttypes.value[0])
const activeProvince = ref({})
const activeCity = ref({})


const searchInUsers = async () => {
  try {
    const response = await $servapi.get('search-user-for-company', {
      params: {
        customerfullname: formData.value.customerfullname,
        phone: formData.value.phone,
        mobile: formData.value.mobile,
        subscriptionid: formData.value.subscriptionid,
      }
    });
    userSearchResault.value = response.data
  } catch (error) {
    console.log(error)
  }
  seacharea.value.classList.toggle('hidden');
}

const getProvinces = async () => {
  try {
    const response = await $servapi.get('provinces');
    provinces.value = response.data
    console.log(provinces.value)

  } catch (error) {
    console.log(error)
  }
}

const getProvinceCities = async () => {
  try {
    if (formData.value.fk_province) {
      const response = await $servapi.get('province-cities', {
        params: {
          provinceId: formData.value.fk_province,
        }
      });
      cities.value = response.data
      console.log(cities.value)
    }

  } catch (error) {
    console.log(error)
  }
}

const selectSearchedUser = () => {
  userSearchResault.value = []
  seacharea.value.classList.toggle('hidden');
}

const submitForm = async () => {
  try {

  } catch (error) {

  }
}


const selectCity = () => {
  formData.value.fk_city = toRaw(activeCity.value.pk_city)
}
const selectProvince = () => {
  formData.value.fk_province = toRaw(activeProvince.value.pk_province)
  getProvinceCities()
}
const selectReceptiontype = () => {
  formData.value.fk_receptiontype = toRaw(activeReceptiontype.value.pk_receptiontype)
}
const selectTechnicianselecttype = () => {
  formData.value.fk_technicianselecttype = toRaw(activeTechnicianselecttype.value.pk_technicianselecttype)
}

onMounted(() => {
  getProvinces()
})






const searchedResponse = ref([]);
const selected = ref(null);
const isFetching = ref(false);
const location = ref({ coords: { latitude: 0, longitude: 0 } });
const gettingLocation = ref(false);
const xapikey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkMjgzMjk0MDljYThhYmMzMTY5ZjM3YjE0NDdhZjE0ODI1MDQ5ZTk3ZjM0YzBkNTgxNTZiNTRlNTQ0MmUzM2Y1NzQyNjI2ZmQ1MzM0YWYzIn0.eyJhdWQiOiIxMjUxMCIsImp0aSI6IjZkMjgzMjk0MDljYThhYmMzMTY5ZjM3YjE0NDdhZjE0ODI1MDQ5ZTk3ZjM0YzBkNTgxNTZiNTRlNTQ0MmUzM2Y1NzQyNjI2ZmQ1MzM0YWYzIiwiaWF0IjoxNjExNjU1MTk2LCJuYmYiOjE2MTE2NTUxOTYsImV4cCI6MTYxNDE2MDc5Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GyGG-KOFjQMecMRrUhLq23MYuG4k1Z6SN0CtfBtWzQCaIXYmxEJNEiX1WX6-vbPxnAPJUDGF2ulc49-AEKMCpBKNT4_BZHnFzFvQxPWUTZJ5tD6JErtdzs6BQGlzYT_n4Bg02UEFcIrrcv6PXqAbh96EHJQZOQa392xK0CCCXbbrgABqRvXQpyfAN3fIj7s_N0sjDGDNAtLbWE9kJAhgi3myRSSHJPGOF5bR4B1ES7EROILpFnvum9Bk0YZo4-zpX0lXTU81nlLuAav4fLsrlEYvq5ZFrE33WtfKTSxra6IViOA9qWVkOcrDAIKHVhGcCarqeoMDZGCbwMbrt1s8PA"



const searchAddress = async (event) => {
  const query = event.query;
  if (!query) return;

  isFetching.value = true;

  try {
    let url;
    if (gettingLocation.value) {
      url = `https://map.ir/search/v2?text=${query}&lat=${location.value.coords.latitude}&lon=${location.value.coords.longitude}`;
    } else {
      url = `https://map.ir/search/v2?text=${query}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": xapikey,
      },
    });

    if (!response.ok) throw new Error("خطا در دریافت داده‌ها");

    const data = await response.json();
    searchedResponse.value = data.value || [];
  } catch (error) {
    console.error("خطا در جستجو:", error);
  } finally {
    isFetching.value = false;
  }
};

// تابع تغییر مرکز نقشه
const changeMapCenter = (option) => {
  // منطق تغییر مرکز نقشه را اینجا اعمال کنید
  console.log("مرکز نقشه تغییر کرد:", option);
};

// تابع انتخاب آیتم
const handleSelect = (event) => {
  selected.value = event.value;
  console.log("آیتم انتخاب شد:", selected.value);
};


</script>
<style>
.user-search-box {
  width: 96%;
  height: 150px;
  overflow-y: scroll;
}
</style>

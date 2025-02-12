<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />

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
              <InputText size="small" class="w-full" id="over_label" v-model="formData.customerfullname"
                @input="searchInUsers" />
              <label for="over_label">نام و نام خانودگی مشتری</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.phone" @input="searchInUsers" />
              <label for="over_label">شماره تلفن</label>
            </FloatLabel>
          </div>
          <div class="md:w-80">
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="formData.mobile" @input="searchInUsers" />
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
            <div v-for="(item, index) in userSearchResault" @click="selectSearchedUser(item)">
              <div class="flex flex-col md:flex-row gap-4 pt-3">
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
              <div class="flex flex-col md:flex-row gap-4 pb-3">
                {{ item.address }}
              </div>
              <hr>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-4 mt-7">
          <div>
            <Select size="small" v-model="activeProvince" :options="provinces" filter optionLabel="province"
              placeholder="استان" class="w-full" @change="selectProvince">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.province" class="flex items-center">
                  <div>{{ slotProps.value.province }}</div>
                </div>
                <span v-else class="text-gray-400">
                  استان
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.province }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div>
            <Select size="small" v-model="activeCity" :options="cities" filter optionLabel="city" placeholder="شهر"
              class="w-full" @change="selectCity">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.city" class="flex items-center">
                  <div>{{ slotProps.value.city }}</div>
                </div>
                <span v-else class="text-gray-400">
                  شهر
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.city }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div>
            <FloatLabel>
              <InputText size="small" class="w-full" id="over_label" v-model="activeUser.address" />
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
        <MapView :coordinates="coordinates" />
        <div class="flex flex-col md:flex-row gap-4 mt-7">
          <div class="md:w-80">
            <Select size="small" v-model="activeBrand" :options="brands" filter optionLabel="elementcategory"
              placeholder="برند دستگاه" class="w-full" @change="selectBrand">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.elementcategory" class="flex items-center">
                  <div>{{ slotProps.value.elementcategory }}</div>
                </div>
                <span v-else class="text-gray-400">
                  برند دستگاه
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.elementcategory }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="md:w-80">
            <Select size="small" v-model="activeDeviceType" :options="deviceTypes" filter optionLabel="element"
              placeholder="نوع دستگاه" class="w-full" @change="selectDeviceType">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.element" class="flex items-center">
                  <div>{{ slotProps.value.element }}</div>
                </div>
                <span v-else class="text-gray-400">
                  نوع دستگاه
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.element }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="md:w-80">
            <Select size="small" v-model="activeDeviceModel" :options="deviceModels" filter optionLabel="subelement"
              placeholder="مدل دستگاه" class="w-full" @change="selectDeviceModel">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.subelement" class="flex items-center">
                  <div>{{ slotProps.value.subelement }}</div>
                </div>
                <span v-else class="text-gray-400">
                  مدل دستگاه
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.subelement }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="flex items-center border rounded-xl text-center border-gray-500 w-24">
            <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">گارانتی</label>
            <input id="vue-checkbox-list" type="checkbox" value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7">
          <div class="md:w-1/3">
            <Select size="small" v-model="activeReceptiontype" :options="receptiontypes" filter
              optionLabel="receptiontype" placeholder="نوع سرویس" class="w-full" @change="selectReceptiontype">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.receptiontype" class="flex items-center">
                  <div>{{ slotProps.value.receptiontype }}</div>
                </div>
                <span v-else class="text-gray-400">
                  نوع سرویس
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.receptiontype }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="md:w-1/3">
            <Select size="small" v-model="activeTechnicianselecttype" :options="technicianselecttypes" filter
              optionLabel="technicianselecttype" placeholder="روش انتخاب سرویسکار" class="w-full"
              @change="selectTechnicianselecttype">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.technicianselecttype" class="flex items-center">
                  <div>{{ slotProps.value.technicianselecttype }}</div>
                </div>
                <span v-else class="text-gray-400">
                  روش انتخاب سرویسکار
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.technicianselecttype }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="md:w-1/3">
            <Select size="small" v-model="activeTechnician" :options="technicians" filter
              optionLabel="technicianfullname" placeholder="سرویس کار" class="w-full" @change="selectTechnician">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.technicianfullname" class="flex items-center">
                  <div>{{ slotProps.value.technicianfullname }}</div>
                </div>
                <span v-else class="text-gray-400">
                  سرویس کار
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.technicianfullname }}</div>
                </div>
              </template>
            </Select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7 items-center">
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel>
              <InputText size="small" id="on_label" class="w-full h-24" v-model="formData.issue" />
              <label for="on_label">مشکل</label>
            </FloatLabel>ّ
          </div>
          <div class="text-white md:w-80 text-center w-full">
            <FloatLabel>
              <InputText size="small" id="on_label" class="w-full h-24" v-model="formData.operatordescription" />
              <label for="on_label">توضیحات اپراتور</label>
            </FloatLabel>ّ
          </div>
          <div>
            <div
              class="w-12 h-10 hidden flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
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
import { useRuntimeConfig } from '#app';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const config = useRuntimeConfig();
const { $servapi } = useNuxtApp();



const getTechnicians = async () => {
  try {
    const response = await $servapi.get('technicians');
    technicians.value = response.data
  } catch (error) {
  }
}

const technicians = ref([])
const activeTechnician = ref({})
const selectTechnician = () => {
  formData.value.fk_technician = toRaw(activeTechnician.value.id)
}





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
const activeUser = ref({})




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
  }
  seacharea.value.classList.toggle('hidden');
}

const getProvinces = async () => {
  try {
    const response = await $servapi.get('provinces');
    provinces.value = response.data
    getBrands();
  } catch (error) {
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
    }

  } catch (error) {
  }
}

const selectSearchedUser = (user) => {
  activeUser.value = user
  activeProvince.value = { 'pk_province': user.pk_province, 'province': user.province }

  formData.value.fk_province = user.pk_province
  formData.value.fk_city = user.pk_city
  formData.value.fk_customer = user.id
  formData.value.fk_useraddress = user.fk_useraddress
  formData.value.customerfullname = user.customerfullname
  formData.value.mobile = user.mobile
  formData.value.phone = user.phone
  formData.value.subscriptionid = user.subscriptionid

  coordinates.value = []
  coordinates.value[0] = user.lat
  coordinates.value[1] = user.lon

  $servapi.get('province-cities', {
    params: {
      provinceId: user.pk_province,
    }
  })
    .then((response) => {
      cities.value = response.data
      activeCity.value = response.data.find(city => city.pk_city === user.pk_city) || {};
      userSearchResault.value = []
      seacharea.value.classList.toggle('hidden');
    })
}


const submitForm = async () => {
  try {
    if (!formData.value.fk_technician)
      toast.add({ severity: 'error', summary: 'خطای اطلاعات ورودی', detail: 'تکنسین را انتخاب نمایید', life: 2000 });
    else if (!formData.value.fk_useraddress)
      toast.add({ severity: 'error', summary: 'خطای اطلاعات ورودی', detail: 'آدرس را انتخاب نمایید', life: 2000 });
    else if (!formData.value.fk_element)
      toast.add({ severity: 'error', summary: 'خطای اطلاعات ورودی', detail: 'دستگاه را انتخاب نمایید', life: 2000 });
    else if (!formData.value.issue)
      toast.add({ severity: 'error', summary: 'خطای اطلاعات ورودی', detail: 'مشکل را وارد نمایید', life: 2000 });
    else {
      await $servapi.post('create-reception', formData.value);
      toast.add({ severity: 'success', summary: 'تایید!', detail: 'اطلاعات با موفقیت ثبت شد', life: 2000 });
      resetFormData();
    }
  } catch (error) {

  }
}

const resetFormData = () => {
  formData.value = {
    fk_receptiontype: activeReceptiontype.value.pk_receptiontype,
    fk_technicianselecttype: activeTechnicianselecttype.value.pk_technicianselecttype,
    fk_receptionstatus: 1,
    createType: 'full',
    customerfullname: '',
    phone: '',
    mobile: '',
    subscriptionid: '',
    fk_province: '',
    fk_city: '',
    fk_customer: '',
    fk_useraddress: '',
    fk_elementcategory: '',
    fk_element: '',
    fk_subelement: '',
    fk_technician: '',
    issue: '',
    operatordescription: '',
  };
  activeUser.value = {};
  activeProvince.value = {};
  activeCity.value = {};
  activeTechnician.value = {}
  activeBrand.value = {};
  activeDeviceType.value = {};
  activeDeviceModel.value = {};
  coordinates.value = [];
  coordinates.value[0] = 35.730041131496804;
  coordinates.value[1] = 51.39303922428917;
  selected.value = null;
};

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
  formData.value.fk_receptiontype = activeReceptiontype.value.pk_receptiontype
  formData.value.fk_technicianselecttype = activeTechnicianselecttype.value.pk_technicianselecttype
  formData.value.fk_receptionstatus = 1
  formData.value.createType = 'full'

  getProvinces()
})






const brands = ref([]);
const deviceTypes = ref([]);
const deviceModels = ref([]);

const activeBrand = ref(null);
const activeDeviceType = ref(null);
const activeDeviceModel = ref(null);

const getBrands = async () => {
  try {
    const response = await $servapi.get('element-categories');
    brands.value = response.data;
    getTechnicians()
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
};

const getDeviceTypes = async () => {
  try {
    if (!activeBrand.value) return;
    const response = await $servapi.get('element-category-elements', {
      params: { elementCategoryId: toRaw(activeBrand.value.pk_elementcategory) },
    });
    deviceTypes.value = response.data;
    activeDeviceType.value = null;
    deviceModels.value = [];
  } catch (error) {
    console.error('Error fetching device types:', error);
  }
};

const getDeviceModels = async () => {
  try {
    if (!activeDeviceType.value) return;
    const response = await $servapi.get('element-subelements', {
      params: { elementId: toRaw(activeDeviceType.value.pk_element) },
    });
    deviceModels.value = response.data;
    activeDeviceModel.value = null;
  } catch (error) {
    console.error('Error fetching device models:', error);
  }
};

const selectBrand = () => {
  formData.value.fk_elementcategory = toRaw(activeBrand.value.pk_elementcategory)
  getDeviceTypes();
};

const selectDeviceType = () => {
  formData.value.fk_element = toRaw(activeDeviceType.value.pk_element)
  getDeviceModels();
};
const selectDeviceModel = () => {
  formData.value.fk_subelement = toRaw(activeDeviceModel.value.pk_subelement)
}




const coordinates = ref([])

const searchedResponse = ref([]);
const selected = ref(null);
const isFetching = ref(false);
const location = ref({ coords: { latitude: 0, longitude: 0 } });
const gettingLocation = ref(false);
const xapikey = config.public.mapIrApiKey;



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

// تابع انتخاب آیتم
const handleSelect = (event) => {
  selected.value = event.value;
  coordinates.value = []
  coordinates.value.push(selected.value.geom.coordinates[1])
  coordinates.value.push(selected.value.geom.coordinates[0])
};


</script>
<style>
.user-search-box {
  width: 96%;
  height: 150px;
  overflow-y: scroll;
}
</style>

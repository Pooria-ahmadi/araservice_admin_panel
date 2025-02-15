<template>
    <div>
        <div class="flex flex-col md:flex-row gap-4 mt-6 mb-8">
            <div class="text-center text-sm md:w-48 mr-20">تاریخ پذریرش: جمعه 21 دی 1403</div>
            <div class="text-center text-sm md:w-40 mr-20">ساعت پذریرش: 14:25</div>
            <div class="text-center text-sm mr-20">صادر کننده: خانم شعبانی</div>
            <div class="text-center text-sm mr-20">شماره پذیرش: 38117</div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7">
            <div class="md:w-80">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full" v-model="formData.customerfullname" @input="searchInUsers" />
                    <label>نام و نام خانودگی مشتری</label>
                </FloatLabel>
            </div>
            <div class="md:w-80">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full" v-model="formData.phone" @input="searchInUsers" />
                    <label>شماره تلفن</label>
                </FloatLabel>
            </div>
            <div class="md:w-80">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full" v-model="formData.mobile" @input="searchInUsers" />
                    <label>شماره موبایل</label>
                </FloatLabel>
            </div>
            <div class="md:w-80">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full" v-model="formData.subscriptionid" @input="searchInUsers" />
                    <label>کد اشتراک</label>
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
                <div v-for="(item, index) in userSearchResults" @click="selectSearchedUser(item)">
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
        <div class="grid grid-cols-4 gap-x-4 mt-7">
            <div>
                <FloatLabel variant="on">
                    <Dropdown size="small" v-model="activeProvince" :options="provinces" optionLabel="province" filter
                        class="w-full" @change="selectProvince" />
                    <label>استان</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel variant="on">
                    <Dropdown size="small" v-model="activeCity" :options="cities" optionLabel="city" filter
                        class="w-full" @change="selectCity" />
                    <label>شهر</label>
                </FloatLabel>
            </div>
            <div class="col-span-2">
                <FloatLabel>
                    <InputText size="small" class="w-full" v-model="activeUser.address" />
                    <label>آدرس</label>
                </FloatLabel>
            </div>
        </div>
        <ModulesHomeeaseAcceptanceSubSearchInMap @update-coordinates="updateCoordinate" />

        <ModulesHomeeaseAcceptanceSubMapView :coordinates="coordinates" />
        <div class="flex flex-col md:flex-row gap-4 mt-7">
            <div class="md:w-80">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeBrand" :options="brands" optionLabel="elementcategory" filter
                        class="w-full" @change="selectBrand" />
                    <label>برند دستگاه</label>
                </FloatLabel>
            </div>
            <div class="md:w-80">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeDeviceType" :options="deviceTypes" optionLabel="element"
                        filter class="w-full" @change="selectDeviceType" />
                    <label>نوع دستگاه</label>
                </FloatLabel>
            </div>
            <div class="md:w-80">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeDeviceModel" :options="deviceModels" optionLabel="subelement"
                        filter class="w-full" @change="selectDeviceModel" />
                    <label>مدل دستگاه</label>
                </FloatLabel>
            </div>
            <div class="flex items-center text-center w-24">
                <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">گارانتی</label>
                <input id="vue-checkbox-list" type="checkbox" value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7">
            <div class="md:w-1/3">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeReceptiontype" :options="receptiontypes"
                        optionLabel="receptiontype" filter class="w-full" @change="selectReceptiontype" />
                    <label>نوع سرویس</label>
                </FloatLabel>
            </div>
            <div class="md:w-1/3">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeTechnicianselecttype" :options="technicianselecttypes"
                        optionLabel="technicianselecttype" filter class="w-full" @change="selectTechnicianselecttype" />
                    <label>روش انتخاب سرویسکار</label>
                </FloatLabel>
            </div>
            <div class="md:w-1/3">
                <FloatLabel>
                    <Dropdown size="small" v-model="activeTechnician" :options="technicians"
                        optionLabel="technicianfullname" filter class="w-full" @change="selectTechnician" />
                    <label>سرویس کار</label>
                </FloatLabel>
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-7 items-center">
            <div class="text-white md:w-80 text-center w-full">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full h-24" v-model="formData.issue" />
                    <label for="on_label">مشکل</label>
                </FloatLabel>ّ
            </div>
            <div class="text-white md:w-80 text-center w-full">
                <FloatLabel variant="on">
                    <InputText size="small" class="w-full h-24" v-model="formData.operatordescription" />
                    <label for="on_label">توضیحات اپراتور</label>
                </FloatLabel>ّ
            </div>
            <div class="w-80 text-white  text-center">
                <button @click="submitForm"
                    class="w-full flex justify-center bg-green-500 shadow-lg shadow-green-500/50  text-white py-2 rounded">
                    <img src="/layout/Tick.png" alt="" class="ml-2">
                    <p>
                        ثبت پذیرش
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useNuxtApp } from '#app';
import { ref, onMounted, toRaw } from 'vue'
import { useToast } from "primevue/usetoast";
import debounce from 'lodash/debounce'

const toast = useToast();
const { $servapi } = useNuxtApp();
const coordinates = ref([])


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



const updateCoordinate = ((newCoordinates) => {
    coordinates.value = newCoordinates;
})



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
const userSearchResults = ref([])
const provinces = ref([])
const cities = ref([])
const deviceTypes = ref([]);
const deviceModels = ref([]);
const brands = ref([]);


const activeProvince = ref({})
const activeCity = ref({})
const activeUser = ref({})
const activeBrand = ref({});
const activeDeviceType = ref({});
const activeDeviceModel = ref({});

const activeReceptiontype = ref(receptiontypes.value[0])
const activeTechnicianselecttype = ref(technicianselecttypes.value[0])
const seacharea = ref(null)


const searchInUsers = debounce(async () => {
    if (
        (!formData.value.customerfullname || formData.value.customerfullname.length < 2) &&
        (!formData.value.phone || formData.value.phone.length < 2) &&
        (!formData.value.mobile || formData.value.mobile.length < 2) &&
        (!formData.value.subscriptionid || formData.value.subscriptionid.length < 2)
    ) {
        userSearchResults.value = []
        return
    }
    try {
        const response = await $servapi.get('search-user-for-company', {
            params: {
                customerfullname: formData.value.customerfullname,
                phone: formData.value.phone,
                mobile: formData.value.mobile,
                subscriptionid: formData.value.subscriptionid,
            }
        });
        userSearchResults.value = response.data
        console.log(response.data.length)
        if (response.data.length > 0)
            seacharea.value.classList.remove('hidden');
    } catch (error) {

    }

}, 500)


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
            userSearchResults.value = []
            seacharea.value.classList.toggle('hidden');
        })
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



onMounted(() => {
    formData.value.fk_receptiontype = activeReceptiontype.value.pk_receptiontype
    formData.value.fk_technicianselecttype = activeTechnicianselecttype.value.pk_technicianselecttype
    formData.value.fk_receptionstatus = 1
    formData.value.createType = 'full'

    getProvinces()
})



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


</script>
<style>
.user-search-box {
    width: 96%;
    height: 150px;
    overflow-y: scroll;
    z-index: 1020;
}
</style>
<template>
    <section>
        <div class="flex mt-3">
            <div class="w-11/12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
                    <div>
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full" v-model="user.customerfullname"
                                @input="searchInUsers" />
                            <label>{{ $t('customer_fullname') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full" v-model="user.phone" @input="searchInUsers" />
                            <label>{{ $t('phone') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full" v-model="user.mobile" @input="searchInUsers" />
                            <label>{{ $t('mobile') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full" v-model="user.subscriptionid"
                                @input="searchInUsers" />
                            <label>{{ $t('subscription_id') }}</label>
                        </FloatLabel>
                    </div>

                </div>
            </div>
            <div class="w-1/12">
                <div class="flex justify-center">
                    <div
                        class="w-8 h-7 pb-1 mt-1 px-1 flex justify-center items-center rounded-lg bg-blue-800 text-white text-lg cursor-pointer">
                        +
                    </div>
                </div>
            </div>
        </div>
        <div class="flex mt-3">
            <div class="w-11/12">
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
                <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeProvince" :options="provinces" class="w-full" filter
                                optionLabel="province" @change="selectProvince">
                            </Select>
                            <label>{{ $t('province') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeCity" filter :options="cities" optionLabel="city"
                                class="w-full" @change="selectCity" />
                            <label>{{ $t('city') }}</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-2">
                        <FloatLabel>
                            <InputText size="small" class="w-full" v-model="user.address" />
                            <label>{{ $t('address') }}</label>
                        </FloatLabel>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue'
import debounce from 'lodash/debounce'

const emit = defineEmits(["select-searched-user"]);
const toast = useToast();
const { $servapi } = useNuxtApp();

const userSearchResults = ref([])
const provinces = ref([])
const cities = ref([])

const user = ref({})
const activeProvince = ref()
const activeCity = ref()
const seacharea = ref(null)

const getProvinces = async () => {
    try {
        const response = await $servapi.get('provinces');
        provinces.value = response.data
    } catch (error) {
    }
}
const getProvinceCities = async () => {
    try {
        $servapi.get('province-cities', {
            params: {
                provinceId: user.value.fk_province,
            }
        })
            .then((response) => {
                cities.value = response.data
                activeCity.value = response.data.find(city => user.value.pk_city === user.value.pk_city) || {};
                userSearchResults.value = []
            })
    } catch (error) {

    }
}

const selectSearchedUser = (item) => {
    user.value = item
    emit('select-searched-user', item)
    activeProvince.value = { 'pk_province': user.value.pk_province, 'province': user.value.province }
    seacharea.value.classList.add('hidden');
    getProvinceCities()
}
const selectProvince = () => {
    user.value.fk_province = toRaw(activeProvince.value.pk_province)
    getProvinceCities()
}
const selectCity = () => {
    user.value.fk_city = toRaw(activeCity.value.pk_city)
}



const searchInUsers = debounce(async () => {
    if (
        (!user.value.customerfullname || user.value.customerfullname.length < 2) &&
        (!user.value.phone || user.value.phone.length < 2) &&
        (!user.value.mobile || user.value.mobile.length < 2) &&
        (!user.value.subscriptionid || user.value.subscriptionid.length < 2)
    ) {
        userSearchResults.value = []
        return
    }
    try {
        const response = await $servapi.get('search-user-for-company', {
            params: {
                customerfullname: user.value.customerfullname,
                phone: user.value.phone,
                mobile: user.value.mobile,
                subscriptionid: user.value.subscriptionid,
            }
        });
        userSearchResults.value = response.data
        if (response.data.length > 0) {
            seacharea.value.classList.remove('hidden');
        }
    } catch (error) {

    }

}, 500)


onMounted(() => {
    getProvinces()
})

</script>
<style>
.user-search-box {
    width: 96%;
    height: 150px;
    overflow-y: scroll;
    z-index: 1020;
}
</style>
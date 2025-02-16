<template>
    <section>
        <div class="flex mt-3">
            <div class="w-11/12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeBrand" :options="brands" filter
                                optionLabel="elementcategory" class="w-full" @change="selectBrand">
                            </Select>
                            <label>{{ $t('device_brand') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeDeviceType" filter :options="deviceTypes"
                                optionLabel="element" class="w-full" @change="selectDeviceType">
                            </Select>
                            <label>{{ $t('device_type') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeDeviceModel" :options="deviceModels"
                                optionLabel="subelement" filter class="w-full" @change="selectDeviceModel">
                            </Select>
                            <label>{{ $t('device_model') }}</label>
                        </FloatLabel>
                    </div>

                </div>
            </div>
            <div class="w-1/12">
                <div class="flex items-center text-center w-24">
                    <label for="vue-checkbox-list" class="w-12 py-2 ms-2 text-sm font-medium text-black">
                        {{ $t('warranty') }}
                    </label>
                    <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 
                    dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 
                    focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue'

const { $servapi } = useNuxtApp();
const emit = defineEmits(["select_device_details"]);



const deviceTypes = ref([]);
const deviceModels = ref([]);
const brands = ref([]);

const activeBrand = ref({});
const activeDeviceType = ref({});
const activeDeviceModel = ref({});

const deviceDetails = ref({})

const selectBrand = () => {
    deviceDetails.value.fk_elementcategory = toRaw(activeBrand.value.pk_elementcategory)
    emit('select_device_details', deviceDetails)
    getDeviceTypes();
};
const selectDeviceType = () => {
    deviceDetails.value.fk_element = toRaw(activeDeviceType.value.pk_element)
    emit('select_device_details', deviceDetails)
    getDeviceModels();
};
const selectDeviceModel = () => {
    deviceDetails.value.fk_subelement = toRaw(activeDeviceModel.value.pk_subelement)
    emit('select_device_details', deviceDetails)
}


const getBrands = async () => {
    try {
        const response = await $servapi.get('element-categories');
        brands.value = response.data;
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
    getBrands();
})
</script>
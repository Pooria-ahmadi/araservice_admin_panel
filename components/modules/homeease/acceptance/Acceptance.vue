<template>
    <section>
        <LayoutsToolbar />
        <ModulesHomeeaseAcceptanceSubSearchInUsers @select-searched-user="selectSearchedUser" />
        <ModulesHomeeaseAcceptanceSubSearchInMap @update-coordinates="updateCoordinate" />
        <ModulesHomeeaseAcceptanceSubMapView :coordinates="coordinates" />
        <ModulesHomeeaseAcceptanceSubSelectDeviceDetails @select_device_details="selectDeviceDetails" />
        <ModulesHomeeaseAcceptanceSubSelectTechnician @select_technician_details="selectTechnicianDetails" />
        <div class="flex mt-3">
            <div class="w-11/12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    <div class="text-center w-full">
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full h-14" v-model="formData.issue" />
                            <label>{{ $t('issue') }}</label>
                        </FloatLabel>
                    </div>
                    <div class="text-center w-full">
                        <FloatLabel variant="on">
                            <InputText size="small" class="w-full h-14" v-model="formData.operatordescription" />
                            <label>{{ $t('operator_description') }}</label>
                        </FloatLabel>
                    </div>
                    <div class="flex items-center h-full">
                        <Button severity="success" class="w-full shadow-green-500/50 bg-green-500" raised
                            :loading="loadingStore.isLoading" @click="submitForm">
                            {{ $t('submit_reception') }}
                            <Icon name="uil:check-circle" class="text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useNuxtApp } from '#app';
import { ref, onMounted, toRaw } from 'vue'
import { useToast } from "primevue/usetoast";
import { useLoadingStore } from '@/stores/loading';
import { useKeyboardShortcuts } from '~/composables/useKeyboardShortcuts';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useKeyboardShortcuts({
    's': () => submitForm(),
});

const loadingStore = useLoadingStore();
const toast = useToast();
const { $servapi } = useNuxtApp();

const formData = ref({});
const coordinates = ref([])

onMounted(() => {
    formData.value.createType = 'full'
})

const updateCoordinate = ((item) => {
    coordinates.value = item;
})
const selectDeviceDetails = (item) => {
    if (item.value.fk_elementcategory)
        formData.value.fk_elementcategory = item.value.fk_elementcategory
    if (item.value.fk_element)
        formData.value.fk_element = item.value.fk_element
    if (item.value.fk_subelement)
        formData.value.fk_subelement = item.value.fk_subelement
}
const selectSearchedUser = (item) => {
    const fields = {
        fk_province: 'pk_province',
        fk_city: 'pk_city',
        fk_customer: 'id',
        fk_useraddress: 'fk_useraddress',
        customerfullname: 'customerfullname',
        mobile: 'mobile',
        phone: 'phone',
        subscriptionid: 'subscriptionid'
    };

    Object.keys(fields).forEach(key => {
        if (item[fields[key]])
            formData.value[key] = item[fields[key]];
    })

    coordinates.value = [];
    if (item.lat && item.lon)
        coordinates.value = [item.lat, item.lon];
}
const selectTechnicianDetails = (item) => {
    if (item.value.fk_receptiontype)
        formData.value.fk_receptiontype = item.value.fk_receptiontype
    if (item.value.fk_technicianselecttype)
        formData.value.fk_technicianselecttype = item.value.fk_technicianselecttype
    if (item.value.fk_technician)
        formData.value.fk_technician = item.value.fk_technician
}

const submitForm = async () => {
    try {
        if (!formData.value.fk_technician)
            toast.add({ severity: 'error', summary: t('validation.input_error'), detail: t('error.technician_required'), life: 2000 });
        else if (!formData.value.fk_useraddress)
            toast.add({ severity: 'error', summary: t('validation.input_error'), detail: t('error.address_required'), life: 2000 });
        else if (!formData.value.fk_element)
            toast.add({ severity: 'error', summary: t('validation.input_error'), detail: t('error.device_required'), life: 2000 });
        else if (!formData.value.issue)
            toast.add({ severity: 'error', summary: t('validation.input_error'), detail: t('error.issue_required'), life: 2000 });
        else {
            await $servapi.post('create-reception', formData.value);
            toast.add({ severity: 'success', summary: $t('success.reception_submitted'), detail: $t('success.reception_submitted'), life: 2000 });
            resetFormData();
        }
    } catch (error) {

    }
}
const resetFormData = () => {
    formData.value = {
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
    coordinates.value = [];
    coordinates.value[0] = 35.730041131496804;
    coordinates.value[1] = 51.39303922428917;
};
</script>
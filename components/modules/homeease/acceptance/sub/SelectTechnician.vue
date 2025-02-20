<template>
    <section>
        <div class="flex mt-3">
            <div class="w-11/12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeReceptionType" :options="receptionTypes"
                                optionLabel="receptiontype" filter class="w-full" @change="selectReceptionType">
                            </Select>
                            <label>{{ $t('service_type') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeTechnicianSelectType" :options="technicianSelectTypes"
                                optionLabel="technicianselecttype" filter class="w-full"
                                @change="selectTechnicianSelectType">
                            </Select>
                            <label>{{ $t('technician_selection_method') }}</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <Select size="small" v-model="activeTechnician" :options="technicians"
                                optionLabel="technicianfullname" filter class="w-full" @change="selectTechnician">
                            </Select>
                            <label>{{ $t('technician') }}</label>
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
import { watch } from 'vue';

const props = defineProps({
    reset: Number
});

const { $servapi } = useNuxtApp();
const emit = defineEmits(["select_technician_details"]);

const receptionTypes = ref([
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
const technicianSelectTypes = ref([
    {
        'pk_technicianselecttype': 1,
        'technicianselecttype': 'دستی',
    },
    {
        'pk_technicianselecttype': 2,
        'technicianselecttype': 'اتوماتیک',
    },
])
const technicians = ref([])

const activeReceptionType = ref(receptionTypes.value[0])
const activeTechnicianSelectType = ref(technicianSelectTypes.value[0])
const activeTechnician = ref({})
const technicianDetail = ref({})

const getTechnicians = async () => {
    try {
        const response = await $servapi.get('technicians');
        technicians.value = response.data
    } catch (error) {

    }
}

const selectReceptionType = () => {
    technicianDetail.value.fk_receptiontype = toRaw(activeReceptionType.value.pk_receptiontype)
    emit('select_technician_details', technicianDetail)
}
const selectTechnicianSelectType = () => {
    technicianDetail.value.fk_technicianselecttype = toRaw(activeTechnicianselectType.value.pk_technicianselecttype)
    emit('select_technician_details', technicianDetail)
}

const selectTechnician = () => {
    technicianDetail.value.fk_technician = toRaw(activeTechnician.value.id)
    emit('select_technician_details', technicianDetail)
}


const resetFormData = () => {
    activeReceptionType.value = receptionTypes.value[0];
    activeTechnicianSelectType.value = technicianSelectTypes.value[0];
    activeTechnician.value = {};
    technicianDetail.value = {
        fk_receptiontype: activeReceptionType.value.pk_receptiontype,
        fk_technicianselecttype: activeTechnicianSelectType.value.pk_technicianselecttype,
        fk_receptionstatus: 1
    };
};

onMounted(() => {
    getTechnicians()
    technicianDetail.value.fk_receptiontype = activeReceptionType.value.pk_receptiontype
    technicianDetail.value.fk_technicianselecttype = activeTechnicianSelectType.value.pk_technicianselecttype
    technicianDetail.value.fk_receptionstatus = 1

    emit('select_technician_details', technicianDetail)
})

watch(() => props.reset, () => {
    resetFormData();
});

</script>
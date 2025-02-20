<template>
    <div class="card">
        <div class="mb-4 mt-2 flex">
            <div class="flex-one mx-2">
                <Button v-tooltip.top="$t('datatable.new')" size="small" severity="secondary" @click="newRecord()">
                    <Icon name="uil:file-plus" style="font-size: 16px;" />
                </Button>
            </div>
            <div class="flex-one mx-2">
                <Button v-tooltip.top="$t('datatable.clearfilter')" size="small" severity="secondary"
                    @click="clearFilter()">
                    <Icon name="uil:filter-slash" style="font-size: 16px;" />
                </Button>
            </div>
            <div class="flex-one">
                <Button class="mx-2" size="small" v-tooltip.top="$t('datatable.refresh')" severity="secondary"
                    @click="getData()">
                    <Icon name="uil:redo" style="font-size: 16px;" />
                </Button>
            </div>
            <div class="flex-one">
                <Button :disabled="props.menu.deleteaccess != 1" class="mx-2" size="small"
                    v-tooltip.top="$t('datatable.delete')" severity="secondary" @click="deleteRow()">
                    <Icon name="uil:trash" style="font-size: 16px;" />
                </Button>
            </div>
            <div class="flex-one mx-2">
                <Button v-tooltip.top="$t('datatable.excelexport')" size="small" severity="secondary"
                    @click="exportCSV($event)">
                    <Icon name="uil:file-upload-alt" style="font-size: 16px;" />
                </Button>
            </div>
            <div lass="flex-one">
                <MultiSelect class="mx-2" v-model="selectedColumns" severity="secondary" :options="columns" size="small"
                    optionLabel="label" filter :maxSelectedLabels="0" @update:modelValue="onToggle" />
            </div>
        </div>
        <hr class="mt-4 mb-6" />
        <DataTable @row-dblclick="doubleClick" v-model:selection="selectedTableData" selectionMode="multiple"
            :metaKeySelection="true" showGridlines :dataKey="menu.primarykey" paginator stripedRows
            columnResizeMode="fit" size="small" :rows="15" ref="dt" resizableColumns v-model:filters="filters"
            sortMode="multiple" removableSort :value="tabledata" filterDisplay="menu" :loading="loadingStore.isLoading"
            :globalFilterFields="['name', 'company']">

            <template #empty> {{ $t('datatable.isempty') }}</template>
            <template #loading> {{ $t('datatable.isloading') }} </template>

            <Column v-for="(col, index) of selectedColumns" :key="col.field + '_' + index" :field="col.field"
                :header="col.label" sortable style="max-width: 100px">
                <template #body="{ data }">
                    <div>
                        {{ data[col.field] }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" :placeholder="`جستجو در ${col.label}`" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { useLoadingStore } from '@/stores/loading';
import { useTabsStore } from '@/stores/tabs';

const props = defineProps({
    menu: Object
});

const { $accapi, $freeapi } = useNuxtApp();

const tabStore = useTabsStore();
const loadingStore = useLoadingStore();

const tabledata = ref([])
const selectedTableData = ref([])
const filters = ref();
const columns = ref([]);
const selectedColumns = ref([]);
const dt = ref();

const getData = async () => {
    const getDataResponse = await $freeapi.get(props.menu.apiget)
    tabledata.value = getDataResponse.data
}

const getMenuData = async () => {
    const getMenuRespone = await $accapi.get('menu-data', { params: { id: props.menu.pk_menu } });
    selectedColumns.value = getMenuRespone.data
    columns.value = getMenuRespone.data;
    initFilters();
    getData()
}

onMounted(() => {
    getMenuData()
});

const deleteRow = async () => {
    const deleteResponse = await $freeapi.post(props.menu.apidestroy)
}
const newRecord = () => {
    let newTab = {
        pk_menu: props.menu.fk_modulemenu,
        menu: props.menu.modulemenu,
        component: props.menu.modulecomponent,
    }
    tabStore.addTab(newTab);
}
const doubleClick = (event) => {
    let newTab = {
        pk_menu: props.menu.fk_modulemenu,
        menu: props.menu.modulemenu,
        component: props.menu.modulecomponent,
        record: event.data,
    }
    tabStore.addTab(newTab);
}
const onToggle = (val) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
};
const clearFilter = () => {
    initFilters();
};
const exportCSV = () => {
    dt.value.exportCSV();
};
const initFilters = () => {
    const dynamicFilters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    selectedColumns.value.forEach((col) => {
        dynamicFilters[col.field] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        };
    });
    filters.value = dynamicFilters;
};
</script>

<style>
.p-datatable-filter-overlay {
    z-index: 1030 !important;
}

.p-select-overlay {
    z-index: 1040 !important;
}
</style>
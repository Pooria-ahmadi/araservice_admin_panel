<template>
    <FloatLabel>
        <AutoComplete v-model="selected" :suggestions="searchedResponse" fluid size="small" class="mt-7"
            optionLabel="address" @complete="searchAddress" field="title" @item-select="selectSearchedMap">
        </AutoComplete>
        <label for="on_label">جستجو در محله ها و مناطق</label>
    </FloatLabel>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
import { useRuntimeConfig } from '#app';
const emit = defineEmits(["update-coordinates"]);

const config = useRuntimeConfig();

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
const selectSearchedMap = (event) => {
    selected.value = event.value;
    const coordinates = [
        selected.value.geom.coordinates[1],
        selected.value.geom.coordinates[0],
    ];
    emit("update-coordinates",coordinates)
};

</script>
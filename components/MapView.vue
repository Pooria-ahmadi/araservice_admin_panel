<template>
  <ClientOnly>
    <div class="map-container">
      <div id="map" ref="mapContainer"></div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useRuntimeConfig } from '#app';
import { onMounted, ref, watchEffect } from 'vue';

const props = defineProps({
  coordinates: Array
});
const config = useRuntimeConfig();

const mapContainer = ref(null);
const map = ref(null);
const marker = ref(null);
const xapikey = config.public.mapIrApiKey;

onMounted(async () => {
  if (typeof window !== "undefined") {
    const L = await import('leaflet');
    await import('leaflet-wms-header');
    await import('leaflet/dist/leaflet.css');

    if (!mapContainer.value) {
      return;
    }

    map.value = L.map(mapContainer.value).setView([35.6892, 51.389], 12);

    L.TileLayer.wmsHeader(
      "https://map.ir/shiveh",
      {
        layers: "Shiveh:Shiveh",
        format: "image/png",
        minZoom: 1,
        maxZoom: 20,
        tileSize: 128
      },
      [{ header: "x-api-key", value: xapikey }]
    ).addTo(map.value);

    function addMarker(lat, lng, view) {
      if (!lat || !lng) {
        return;
      }

      // حذف مارکر قبلی
      if (marker.value) {
        map.value.removeLayer(marker.value);
      }

      marker.value = L.marker([lat, lng]).addTo(map.value)
        .bindPopup(`موقعیت: ${lat}, ${lng}`)
        .openPopup();

      map.value.setView([lat, lng], view);
    }

    
    addMarker(35.730041131496804, 51.39303922428917, 11);

    watchEffect(() => {
      if (props.coordinates?.length === 2) {
        addMarker(props.coordinates[0], props.coordinates[1], 15);
      }
    });
  }
});
</script>

<style>
.map-container {
  width: 100%;
  height: 230px;
}

#map {
  width: 100%;
  height: 230px;
}
</style>

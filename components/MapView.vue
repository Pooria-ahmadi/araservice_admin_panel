<template>
    <ClientOnly>
      <div class="map-container">
        <div id="map" ref="mapContainer"></div>
      </div>
    </ClientOnly>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRuntimeConfig } from '#imports';
  
  const mapContainer = ref(null);
  const config = useRuntimeConfig(); // دریافت API Key از runtimeConfig
  
  onMounted(async () => {
    if (typeof window !== "undefined") {
      const L = await import('leaflet'); // بارگیری Leaflet فقط در کلاینت
      await import('leaflet/dist/leaflet.css');
  
      const map = L.map(mapContainer.value).setView([35.6892, 51.389], 12);
  
      L.tileLayer('https://map.ir/shiveh', {
        layers: 'Shiveh:Shiveh',
        format: 'image/png',
        transparent: true,
        attribution: "© Map.ir",
        headers: {
          "x-api-key": config.public.mapApiKey
        }
      }).addTo(map);
  
      function addMarker(lat, lng) {
        L.marker([lat, lng]).addTo(map)
          .bindPopup(`موقعیت: ${lat}, ${lng}`)
          .openPopup();
        map.setView([lat, lng], 14);
      }
  
      addMarker(35.6892, 51.389);
      window.addMarker = addMarker;
    }
  });
  </script>
  
  <style>
  .map-container {
    width: 100%;
    height: 100vh;
  }
  
  #map {
    width: 100%;
    height: 100%;
  }
  </style>
  
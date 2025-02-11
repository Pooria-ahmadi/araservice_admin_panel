<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup>
import { useNuxtApp } from '#app';
import { onMounted } from 'vue';

const { $updateAuthHeader } = useNuxtApp();

onMounted(() => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    $updateAuthHeader(token);
  }
});
</script>

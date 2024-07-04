<template>
  <div v-if="isLoggedIn" class="container">
    <h1 class="mb-4">Your account</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <button class="btn btn-primary" type="submit">Sign out</button>
    </form>
  </div>
  <div v-else>
    <h1><b>You are not logged in.</b> Please log in to access your account.</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import router from '@/router'

const store = useStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const handleSubmit = async () => {
  const success = await store.dispatch('logout');
  if (success) {
    console.log('Log out successful!');
    await router.push({ name: 'home' });
  } else {
    console.log('Log out failed.');
  }
}
</script>

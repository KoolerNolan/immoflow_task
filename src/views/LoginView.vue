<template>
  <div class="vue-testing__login-form container">
    <form class="form" @submit.prevent="handleSubmit">
      <h3 class="mb-4">Sign in to your account</h3>
      <div class="form-group mb-2">
        <input
          class="form-control"
          v-model="email"
          name="email"
          type="email"
          placeholder="Your email address ..."
          required
        />
      </div>
      <div class="form-group mb-2">
        <input
          class="form-control"
          v-model="password"
          name="password"
          type="password"
          placeholder="Your password ..."
          required
        />
      </div>
      <div class="action-wrapper mt-3 d-flex flex-row align-items-center gap-3">
        <button class="btn btn-primary" type="submit">Sign in</button>
        <a class="text-decoration-none" href="#">Forgot my password</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store';
import router from '@/router';

const email = ref('');
const password = ref('');

const store = useStore();

const handleSubmit = async () => {
  const success = await store.dispatch('login', { email: email.value, password: password.value });
  if (success) {
    console.log('Login successful!');
    await router.push({ name: 'account', params: { userId: '123' } });
  } else {
    console.log('Login failed. Invalid credentials.');
  }
}
</script>

<template>
  <div class="vue-testing__register-form container">
    <form class="form" @submit.prevent="handleSubmit">
      <h3>Anmelden</h3>
      <div class="form-group mb-2">
        <input class="form-control" v-model="formData.email" name="email" type="email" placeholder="Ihre E-Mail-Adresse ..." />
      </div>
      <div class="form-group mb-2">
        <input class="form-control" v-model="formData.password" name="password" type="password" placeholder="Ihr Passwort ..." />
      </div>
      <button class="btn btn-primary" type="submit">Anmelden</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  email: '',
  password: ''
});

const handleSubmit = () => {
  // Handle form submission here, e.g., validation, API call
  console.log('Form submitted with:', formData);
};
</script>

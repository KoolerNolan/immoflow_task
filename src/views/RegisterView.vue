<template>
  <div class="vue-testing__register-form container">
    <form class="form" @submit.prevent="handleSubmit">
      <h3>Ein Konto registrieren</h3>
      <div class="form-group mb-2">
        <input class="form-control" v-model="formData.name" name="name" type="text" placeholder="Ihr Name ..." />
      </div>
      <div class="form-group mb-2">
        <input class="form-control" v-model="formData.email" name="email" type="email" placeholder="Ihre E-Mail-Adresse ..." />
      </div>
      <div class="form-group mb-2">
        <input class="form-control" v-model="formData.password" name="password" type="password" placeholder="Ihr Passwort ..." />
      </div>
      <button class="btn btn-primary" type="submit">Registrieren</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  password: ''
});

const handleSubmit = () => {
  // Handle form submission here, e.g., validation, API call
  console.log('Form submitted with:', formData);
};
</script>

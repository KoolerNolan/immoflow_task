<template>
  <div class="vue-testing__register-form container">
    <form class="form" @submit.prevent="handleSubmit">
      <h3 class="mb-4">Register a new account</h3>
      <div class="form-group mb-2">
        <input
          class="form-control"
          v-model="formData.name"
          name="name"
          type="text"
          placeholder="Your name ..."
        />
      </div>
      <div class="form-group mb-2">
        <input
          class="form-control"
          v-model="formData.email"
          name="email"
          type="email"
          placeholder="Your email address ..."
          required
        />
      </div>
      <div class="form-group mb-2">
        <input
          class="form-control"
          v-model="formData.password"
          name="password"
          type="password"
          placeholder="Your password ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="action-wrapper mt-3 d-flex flex-row align-items-center gap-3">
        <button class="btn btn-primary" type="submit">Register</button>
        <a class="text-decoration-none" href="/login">Already have an account</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  // Save form data to cookie.
  Cookies.set('userFormData', JSON.stringify(formData), { expires: 7 }) // Expires in 7 days.
  console.log('Form submitted with:', formData)

  formData.name = ''
  formData.email = ''
  formData.password = ''

  router.push({ name: 'login' })
}
</script>

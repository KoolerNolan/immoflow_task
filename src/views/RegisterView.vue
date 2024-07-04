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
        <div v-if="emailError" class="text-danger">{{ emailError }}</div>
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
        <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
      </div>
      <div class="action-wrapper mt-3 d-flex flex-row align-items-center gap-3">
        <button class="btn btn-primary" type="submit">Register</button>
        <a class="text-decoration-none" href="/login">Already have an account</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailPattern.test(email)
}

const validatePassword = (password: string): boolean => {
  const passwordPattern = /^(?=.*\d).{8,}$/
  return passwordPattern.test(password)
}

const handleSubmit = () => {
  emailError.value = null // Reset email error.
  passwordError.value = null // Reset password error.

  if (!validateEmail(formData.email)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  if (!validatePassword(formData.password)) {
    passwordError.value =
      'Password must be at least 8 characters long and include at least one number.'
    return
  }

  // Save form data to cookie.
  Cookies.set('userFormData', JSON.stringify(formData), { expires: 7 }) // Expires in 7 days.
  console.log('Form submitted with:', formData)

  formData.name = ''
  formData.email = ''
  formData.password = ''

  router.push({ name: 'login' })
}
</script>

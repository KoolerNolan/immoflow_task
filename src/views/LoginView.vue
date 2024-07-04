<template>
  <div v-if="isLoggedIn" class="vue-testing__login-form container">
    <h1>You are already logged in!</h1>
  </div>
  <div v-else>
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
        <div v-if="emailError" class="text-danger">{{ emailError }}</div>
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
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'

const email = ref('')
const password = ref('')

const store = useStore()

const isLoggedIn = computed(() => store.getters.isLoggedIn)

const emailError = ref<string | null>(null)

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailPattern.test(email)
}

const handleSubmit = async () => {
  emailError.value = null // Reset email error

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  const success = await store.dispatch('login', { email: email.value, password: password.value })
  if (success) {
    console.log('Login successful!')
    await router.push({ name: 'account' })
  } else {
    console.log('Login failed. Invalid credentials.')
    emailError.value = 'An account with this email address does not exist.'
  }
}
</script>

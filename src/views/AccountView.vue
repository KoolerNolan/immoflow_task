<template>
  <div v-if="isLoggedIn" class="container">
    <div class="mb-4">
      <h1 class="mb-3">Welcome, {{ userFormData.name }}!</h1>
      <div class="alert alert-dark" role="alert">
        <p class="m-0 p-0">Here you can adjust your account info and credentials.</p>
      </div>
    </div>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="customize-account-wrapper">
        <div
          class="form-group d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center mb-2"
        >
          <input
            class="form-control flex-fill"
            v-model="formData.name"
            name="name"
            type="text"
            placeholder="Your new name ..."
            autocomplete="off"
          />
          <button class="btn btn-secondary" type="button" @click="handleUpdateName">
            Update Name
          </button>
        </div>
        <div v-if="nameFeedback" class="text-success mb-2">{{ nameFeedback }}</div>
        <div
          class="form-group d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center mb-2"
        >
          <input
            class="form-control flex-fill"
            v-model="formData.email"
            name="email"
            type="email"
            placeholder="Your new email address ..."
            autocomplete="off"
          />
          <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          <button class="btn btn-secondary" type="button" @click="handleUpdateEmail">
            Update Email
          </button>
        </div>
        <div v-if="emailFeedback" class="text-success mb-2">{{ emailFeedback }}</div>
        <div
          class="form-group d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center mb-2"
        >
          <input
            class="form-control flex-fill"
            v-model="formData.password"
            name="password"
            type="password"
            placeholder="Your new password ..."
            autocomplete="off"
          />
          <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
          <button class="btn btn-secondary" type="button" @click="handleUpdatePassword">
            Update Password
          </button>
        </div>
        <div v-if="passwordFeedback" class="text-success mb-2">{{ passwordFeedback }}</div>
      </div>
      <div class="action-wrapper mt-4 d-flex flex-row align-items-center gap-3">
        <button class="btn btn-primary" type="submit">Sign out</button>
        <button class="btn btn-warning" type="button" @click="handleDeleteAccount">
          Delete account
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <h1><b>You are not logged in.</b> Please log in to access your account.</h1>
  </div>
</template>

<style scoped>
.customize-account-wrapper div button {
  width: 235px;
}
</style>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

const store = useStore()

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const userFormData = computed(() => store.getters.userFormData)

formData.name = userFormData.value.name
formData.email = userFormData.value.email
formData.password = userFormData.value.password

const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)
const nameFeedback = ref<string | null>(null)
const emailFeedback = ref<string | null>(null)
const passwordFeedback = ref<string | null>(null)

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailPattern.test(email)
}

const validatePassword = (password: string): boolean => {
  const passwordPattern = /^(?=.*\d).{8,}$/
  return passwordPattern.test(password)
}

const handleUpdateName = async () => {
  nameFeedback.value = null
  const success = await store.dispatch('updateUserName', formData.name)
  if (success) {
    nameFeedback.value = 'Name update successful!'
  } else {
    nameFeedback.value = 'Name update failed.'
  }
}

const handleUpdateEmail = async () => {
  emailError.value = null
  emailFeedback.value = null

  if (!validateEmail(formData.email)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  const success = await store.dispatch('updateUserEmail', formData.email)
  if (success) {
    emailFeedback.value = 'Email update successful!'
  } else {
    emailFeedback.value = 'Email update failed.'
  }
}

const handleUpdatePassword = async () => {
  passwordError.value = null
  passwordFeedback.value = null

  if (!validatePassword(formData.password)) {
    passwordError.value =
      'Password must be at least 8 characters long and include at least one number.'
    return
  }

  const success = await store.dispatch('updateUserPassword', formData.password)
  if (success) {
    passwordFeedback.value = 'Password update successful!'
  } else {
    passwordFeedback.value = 'Password update failed.'
  }
}

const handleSubmit = async () => {
  const success = await store.dispatch('logout')
  if (success) {
    console.log('Log out successful!')
    await router.push({ name: 'home' })
  } else {
    console.log('Log out failed.')
  }
}

const handleDeleteAccount = async () => {
  const confirmation = confirm(
    'Are you sure you want to delete your account? This action cannot be undone.'
  )
  if (confirmation) {
    const success = await store.dispatch('deleteAccount')
    if (success) {
      console.log('Account deletion successful!')
      await router.push({ name: 'home' })
    } else {
      console.log('Account deletion failed.')
    }
  }
}
</script>

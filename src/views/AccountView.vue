<template>
  <div v-if="isLoggedIn" class="container">
    <h1 class="mb-4">Your account</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="action-wrapper mt-3 d-flex flex-row align-items-center gap-3">
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

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import router from '@/router'

const store = useStore()

const isLoggedIn = computed(() => store.getters.isLoggedIn)

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

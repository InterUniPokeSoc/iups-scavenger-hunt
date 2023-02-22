<template>
  <router-view />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { supabase } from '@/services/Supabase'
  import { useRouter } from 'vue-router'
  import store from '@/data/Store'

  const appReady = ref(false)

  try {
    const session = supabase.auth.getSession()

    if (!session) { appReady.value = true; }

    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session)
    })
  } catch {
    appReady.value = true
  }
</script>

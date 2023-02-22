<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" :width="200" />
    </v-app-bar-title>

    <template v-slot:append>
      <v-avatar v-if="user" color="red">{{ user.email[0].toUpperCase() }}</v-avatar>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import store from '@/data/Store'

  const user = ref(store.state.user)
</script>

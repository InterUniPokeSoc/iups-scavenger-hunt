<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" :width="200" />
    </v-app-bar-title>

    <template v-slot:append>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" v-if="user" color="red" style="cursor: pointer">{{ user.email[0].toUpperCase() }}</v-avatar>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                prepend-avatar=""
                :title="user.discord"
                :subtitle="user.email"
              >
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="primary"
                variant="text"
                @click="menu = false"
              >
                Sign Out
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                variant="text"
                @click="menu = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import store from '@/data/Store'

  const user = ref(store.state.user)

  const fav = ref(true)
  const menu = ref(false)
  const message = ref(false)
  const hints = ref(true)
</script>

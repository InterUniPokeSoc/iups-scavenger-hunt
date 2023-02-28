<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" :width="200" />
    </v-app-bar-title>

    <v-btn
      v-if="user"
      icon="mdi-home"
      color="primary"
      href="./dashboard"
    ></v-btn>

    <template v-slot:append>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
          v-if="user"
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
                @click="signOut"
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
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '@/services/Supabase'
  import store from '@/data/Store'

  const router = useRouter()
  
  const user: any = ref(store.state.user)

  watch(
    () => user.value = store.state.user, () => {
      store.state.user
    }
  )

  const menu = ref(false)

  const signOut = () => {
    store.methods.destroySession()
    supabase.auth.signOut()

    router.push('/')

    menu.value = false
  }
</script>

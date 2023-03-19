<template>
  <v-app-bar :elevation="2">
    <v-app-bar-nav-icon @click="() => drawer = !drawer" v-if="user"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <a href="./">
        <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" :width="200" />
      </a>
    </v-app-bar-title>

    <!-- <v-btn
      v-if="user"
      icon="mdi-home"
      color="primary"
      href="./dashboard"
    ></v-btn> -->

    <template v-slot:append>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
          v-if="user"
        >
          <template v-slot:activator="{ props }">
            <v-avatar 
              v-bind="props" 
              v-if="user" 
              color="black" 
              style="cursor: pointer"
              :image="user?.user_metadata?.avatar_url"
            >
              {{ user?.user_metadata?.avatar_url ?? user?.user_metadata?.full_name?.toUpperCase()[0] ?? "" }}
            </v-avatar>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                :prepend-avatar="user?.user_metadata?.avatar_url"
                :title="user?.user_metadata?.full_name"
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

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
  >
    <v-list>
      <v-list-item href="./">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item href="./help">
        <template v-slot:prepend>
          <v-icon icon="mdi-help-rhombus"></v-icon>
        </template>
        <v-list-item-title>Help</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '@/services/Supabase'
  import store from '@/data/Store'

  const router = useRouter()
  
  const user: any = ref(store.state.user)

  const drawer = ref(false)

  const menu = ref(false)

  watch(
    () => user.value = store.state.user, () => {
      store.state.user
    }
  )

  const signOut = () => {
    store.methods.destroySession()
    supabase.auth.signOut()

    router.push('/')

    menu.value = false
  }
</script>

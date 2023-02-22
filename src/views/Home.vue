<template>
  <v-main>
    <v-container>
        <v-responsive class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-card
            variant="outlined"
          >
            <v-card-item class="justify-center">
              <div>
                <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" width="400"/>

                <p class="ma-3">Please log in with your Discord account to continue.</p>
              </div>
            </v-card-item>
            <v-card-actions class="justify-center">
              <v-btn @click="handleLogin" variant="tonal" color=#7289da>Log in with Discord</v-btn>
            </v-card-actions>
          </v-card>

          <v-alert type="error" v-if="errorMessage != ''">{{ errorMessage }}</v-alert>
        </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { supabase } from '@/services/Supabase'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const loading = ref(false)
  const errorMessage = ref("")

  const handleLogin = async () => {
    try {
      loading.value = true
      errorMessage.value = ""

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord'
      })

    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    } finally {
      loading.value = false
    }
  }
</script>

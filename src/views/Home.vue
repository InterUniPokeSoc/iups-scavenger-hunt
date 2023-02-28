<template>
  <v-main>
    <v-container>
        <v-responsive class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-card variant="outlined">
            <v-card-item class="justify-center">
              <v-img src="@/assets/images/iups-scavenger-hunt-logo-light.png" width="400" class="ma-auto"/>

              <div v-if="userId == null">
                <p class="ma-3">Please log in with your Discord account to continue</p>

                <p class="ma-3">You can remove permissions for this app through your Discord settings</p>

                <v-switch label="I agree to have my Email, Discord Id and Profile Image stored and processed by I-UPS using Supabase" color="indigo" inset v-model="gdprAgreement"></v-switch>
              </div>
            </v-card-item>
            <v-card-actions v-if="userId == null" class="justify-center">
              <v-btn @click="handleLogin" variant="tonal" color=#7289da :disabled="!gdprAgreement">Log in with Discord</v-btn>
            </v-card-actions>
            <v-card-actions v-else class="justify-center">
              <v-btn href="./" variant="tonal" color=#7289da>Continue to Dashboard</v-btn>
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

  import store from '@/data/Store'

  const router = useRouter()

  const loading = ref(false)
  const errorMessage = ref("")

  const gdprAgreement = ref(false)

  const userId = ref(store.state.user?.id)

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

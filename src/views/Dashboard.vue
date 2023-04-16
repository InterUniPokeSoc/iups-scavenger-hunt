<template>
    <v-main>
      <v-container>
          <v-responsive v-if="loading" class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </v-responsive>

          <v-responsive v-else class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <v-row no-gutters class="justify-center align-center">
              <v-icon icon="mdi-treasure-chest" size="x-large" class="ma-1"></v-icon>
              <h1 class="ma-1">Dashboard</h1>
            </v-row>
            <v-container class="bg-surface">
              <v-row no-gutters class="justify-center">
                <v-alert
                  v-if="hunts == null || Object.keys(hunts).length < 1"
                  type="info"
                  title="There are no Hunts Available"
                  variant="tonal"
                ></v-alert>

                <v-col
                  v-else
                  v-for="hunt, index in hunts"
                  :key="index"
                  cols="12"
                  sm="6"
                >
                <v-card 
                  class="justify-center align-center ma-3"
                  variant="outlined"

                  :title="'Hunt ' + (hunt.id)"
                  :subtitle="`${new Date(hunt.startDate).toLocaleDateString('en-GB')} - ${new Date(hunt.endDate).toLocaleDateString('en-GB')}`"
                >
                  <v-card-text class="justify-center align-center">
                    <v-row v-if="hunt.participation" class="justify-center align-center ma-3">
                      <v-chip :color="ScoreUtility.scoreToColour(hunt.score, hunt.maxScore)" size="large">
                        {{ hunt.score }}
                      </v-chip>
                      <p class="ma-1">{{ `/ ${hunt.maxScore}` }}</p>
                    </v-row>

                    <v-row v-else class="justify-center align-center ma-3">
                      <v-chip color="deep-orange" size="large">
                        {{ "Not Attempted" }}
                      </v-chip>
                    </v-row>

                    <v-divider></v-divider>

                    <v-row class="justify-center align-center ma-2">
                      <v-chip v-if="hunt.participation && hunt.tier" :color="ScoreUtility.tierToColor(hunt.tier)">
                          {{ hunt.tier }}
                      </v-chip>

                      <p v-if="hunt.participation && hunt.tier" class="ma-2">Tier</p>
                      <p v-else-if="hunt.participation && !hunt.tier" class="ma-2">Excluded</p>
                      <p v-else class="ma-2">Available to Join</p>
                    </v-row>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn 
                      @click="hunt.participation ? goToHunt(hunt) : joinHunt(hunt)" 
                      :prepend-icon="hunt.participation ? 'mdi-magnify' : 'mdi-plus'"
                      :color="hunt.participation ? 'black' : 'deep-orange'"
                      variant="outlined"
                    >
                      {{ hunt.participation ? 'View' : 'Join' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
                </v-col>
              </v-row>
            </v-container>

            <v-pagination v-model="page" :length="(hunts.length / 5) + 1" class="ma-2"></v-pagination>

            <v-snackbar
              v-model="joinSnackbar"
              :timeout="joinSnackbarTimeout"
            >
              {{ "Joined Hunt" }}

              <template v-slot:actions>
                <v-btn
                  color="green"
                  variant="text"
                  @click="joinSnackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

          </v-responsive>
      </v-container>
    </v-main>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { HuntService } from '@/services/HuntService'
    import { Hunt } from '@/models/Hunt'
    import store from '@/data/Store'
    import { Local, LocalProperty } from '@/data/Local'
    import { ParticipationService } from '@/services/ParticipationService'
    import { ScoreUtility } from '@/utilities/ScoreUtility'

    let router = useRouter()

    let paginationPointer = ref(0)
    let loading = ref(false)
    let error = ref(false)

    let joinSnackbar = ref(false)
    let joinSnackbarTimeout = ref(2000)

    let hunts = ref(new Array<Hunt>())
    let userId = ref(store.state.user.id)

    let page = ref(1)

    onMounted(async () => {
      if (!userId?.value) error.value = true

      await getHunts()
    })

    watch(page, 
      async () => { await getHunts() }
    )

    const getHunts = async () => {
      loading.value = true

      await HuntService.fetchHunts(userId.value, page.value - 1).then((result) => {
        hunts.value = result

        loading.value = false
      }).catch(() => {
        error.value = true
        loading.value = false
      })
    }

    const getResult = (result: any) => {
      return 0
    }

    const joinHunt = async (hunt: Hunt) => {
      if (hunt.participation) return

      loading.value = true
      
      await ParticipationService.addParticipationFor(hunt.id, userId.value).catch((e) => {
        error.value = true
      }).then(async () => {
        joinSnackbar.value = true

        await getHunts().finally(() => {
          loading.value = false
        })
      })
    }

    const goToHunt = (hunt: Hunt) => {
      if (!hunt.participation) return

      Local.setProperty(LocalProperty.SELECTED_HUNT, hunt.id)

      router.push('/hunt')
    }
  </script>
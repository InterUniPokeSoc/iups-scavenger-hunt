<template>
    <v-main>
      <v-container>
          <v-responsive v-if="loading" class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </v-responsive>

          <v-responsive v-else class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <h1>Hunt Dashboard</h1>
            <v-card>
              <v-card-text>
                <v-table 
                  class="elevation-1"
                >
                  <thead>
                  <tr>
                      <th class="text-center">
                      Hunt Number
                      </th>
                      <th class="text-center">
                      Start Date
                      </th>
                      <th class="text-center">
                      End Date
                      </th>
                      <th class="text-center">
                      Score
                      </th>
                      <th class="text-center">
                      Tier
                      </th>
                      <th class="text-center">
                      Actions
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="hunt, index in hunts"
                      :key="index"
                  >
                    <td>{{ hunt.id + 1 }}</td>
                    <td>{{ hunt.startDate }}</td>
                    <td>{{ hunt.endDate }}</td>
                    <td>
                    <v-row v-if="hunt.hasParticipation" class="justify-center align-center ma-1">
                      <v-chip :color="ScoreUtility.scoreToColour(hunt.score, hunt.maxScore)">
                        {{ hunt.score }}
                      </v-chip>
                      <p class="ma-1">{{ `/ ${hunt.maxScore}` }}</p>
                    </v-row>
                    </td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <v-chip v-if="hunt.hasParticipation && hunt.tier" :color="ScoreUtility.tierToColor(hunt.tier)">
                        {{ hunt.tier }}
                      </v-chip>
                    </v-row>
                    </td>
                    <td>
                      <v-btn 
                        @click="hunt.hasParticipation ? goToHunt(hunt) : joinHunt(hunt)" 
                        :prepend-icon="hunt.hasParticipation ? 'mdi-magnify' : 'mdi-plus'"
                        :color="hunt.hasParticipation ? 'black' : 'deep-orange'"
                        variant="outlined"
                      >
                        {{ hunt.hasParticipation ? 'View' : 'Join' }}
                      </v-btn>
                    </td>
                  </tr>
                  </tbody>
                </v-table>

                <v-pagination v-model="page" :length="(hunts.length / 5) + 1" class="ma-2"></v-pagination>
              </v-card-text>
            </v-card>

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
      if (hunt.hasParticipation) return

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
      if (!hunt.hasParticipation) return

      Local.setProperty(LocalProperty.SELECTED_HUNT, hunt.id)

      router.push('/hunt')
    }
  </script>
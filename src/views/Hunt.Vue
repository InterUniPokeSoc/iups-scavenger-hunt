<template>
    <v-main>
      <v-container>
        <v-responsive v-if="loading" class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </v-responsive>

        <v-responsive v-else-if="error" class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-alert
            type="error"
            title="An Error Occurred"
            text="An error occurred while attempting to load this Hunt."
            variant="tonal"
          ></v-alert>
        </v-responsive>

        <v-responsive v-else class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <h1>Hunt {{ Number(huntId) + 1 }} Questions</h1>

          <v-card>
            <v-card-text>
              <v-table class="elevation-1">
                <thead>
                <tr>
                    <th class="text-center">
                    Question Number
                    </th>
                    <th class="text-center">
                    Score
                    </th>
                    <th class="text-center">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="hint, index in hints"
                    :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <v-row v-if="hint.userScore" class="justify-center align-center ma-1">
                      <v-chip class="ma-1" :color="hint.userScore > 0 ? 'green' : 'red'">{{ hint.userScore }}</v-chip>
                      {{ `/ ${hint.maxValue}` }}
                    </v-row>
                  </td>
                  <td><v-btn prepend-icon="mdi-pencil" :disabled="hint.userScore != null || hints[index-1].userScore == null">{{ hint.userScore ? 'Answered' : hints[index-1].userScore ? 'Start' : 'Unavailable' }}</v-btn></td>
                </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>

        </v-responsive>
      </v-container>
    </v-main>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { HintService } from '@/services/HintService'
    import { Hint } from '@/models/Hint'
    import store from '@/data/Store'

    const urlParams = new URLSearchParams(window.location.search)
    let huntId = ref(urlParams.get('huntId'))

    let loading = ref(false)
    let error = ref(false)

    let hints = ref(new Array<Hint>())

    try {
      onMounted(async () => {
        loading.value = true

        if (!huntId) { 
          loading.value = false
          return
        }

        let userId = store.state.user.id

        if (!userId || !huntId?.value) throw Error("UserId or HuntId is Invalid")

        await HintService.fetchHintsFor(Number(huntId.value), userId).then((result) => {
          hints.value = result

          loading.value = false
        }).catch(() => {
          error.value = true
          loading.value = false
        })
      })
  } catch {
    error.value = true
    loading.value = false
  }

  const getPercentageScore = (score: number, max: number) => {
    return Math.floor((score / max) * 100)
  }
  </script>
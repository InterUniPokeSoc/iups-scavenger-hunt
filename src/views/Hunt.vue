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
            <td>{{ hint.id + 1 }}</td>
            <td>
              <v-row v-if="hint.userScore" class="justify-center align-center ma-1">
                <v-chip class="ma-1" :color="ScoreUtility.scoreToColour(hint.userScore, hint.maxValue)">{{ hint.userScore }}</v-chip>
                {{ `/ ${hint.maxValue}` }}
              </v-row>
              <v-row v-else-if="hints[index-1]?.userScore" class="justify-center align-center ma-1">
                <v-chip class="ma-1" color="orange">In Progress</v-chip>
              </v-row>
            </td>
            <td>
              <v-btn 
                @click="goToHint(hint.id)" 
                :prepend-icon="hint.userScore ? 'mdi-check-circle' : index == 0 || hints[index-1]?.userScore ? 'mdi-pencil' : 'mdi-cancel'" 
                :disabled="!hintAvailable(index)"
                variant="outlined"
                :color="hint.userScore ? 'teal' : index == 0 || hints[index-1]?.userScore ? 'deep-orange' : 'pink'"
              >
                {{ hint.userScore ? 'Answered' : index == 0 || hints[index-1]?.userScore ? 'Start' : 'Unavailable' }}
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>

        <v-alert
          v-if="huntIsComplete()"
          type="success"
          title="Hunt Completed"
          text="You have successfully completed this hunt!"
          variant="tonal"
          class="ma-3"
        ></v-alert>

      </v-responsive>
    </v-container>
  </v-main>
</template>
  
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import {HintService } from '@/services/HintService'
  import { Hint } from '@/models/Hint'
  import store from '@/data/Store'
  import { Local, LocalProperty } from '@/data/Local'
  import { ResponseService } from '@/services/ResponseService'
  import { ScoreUtility } from '@/utilities/ScoreUtility'

  let router = useRouter()

  let huntId = ref(Local.getProperty(LocalProperty.SELECTED_HUNT))

  let userId = ref(store.state.user.id)

  let loading = ref(false)
  let error = ref(false)

  let hints = ref(new Array<Hint>())

  onMounted(async () => {
    loading.value = true

    if (!userId || !huntId) { 
      error.value = true
      loading.value = false
      return
    }

    await HintService.fetchHintsFor(Number(huntId.value), userId.value).then((result) => {

      hints.value = result

      loading.value = false
    }).catch(() => {
      error.value = true
      loading.value = false
    })
  })

  const hintAvailable = (index: number): boolean =>  {
    if (index == 0 && hints.value[index]?.userScore == null) return true

    return (hints.value[index]?.userScore != null || hints.value[index-1]?.userScore != null)
  }

  const getPercentageScore = (score: number, max: number) => {
    return Math.floor((score / max) * 100)
  }

  const goToHint = (hintId: number) => {
    Local.setProperty(LocalProperty.SELECTED_HINT, hintId)

    router.push('/hint')
  }

  const huntIsComplete = () => {
    return hints?.value[hints.value.length-1]?.userScore != null
  }
</script>

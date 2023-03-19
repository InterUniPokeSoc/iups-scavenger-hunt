<template>
    <v-main>
      <v-container>
        <v-responsive v-if="loading" class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </v-responsive>

        <v-responsive v-else-if="error || hint == null" class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-alert
            type="error"
            title="An Error Occurred"
            text="An error occurred while attempting to load this Hint."
            variant="tonal"
          ></v-alert>
        </v-responsive>

        <v-responsive v-else-if="hint" class="d-flex align-center text-center fill-height" id="main-responsive-container">
          <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

          <v-card variant="outlined">
            <v-card-text>
              <h1>Hint {{ (hint.order + 1) }}</h1>
              <p class="ma-3">{{ (hint.question) }}</p>
              <v-img v-if="hint.imageUrl" :src="hint.imageUrl" height="200"></v-img>

              <v-text-field 
                v-model="answer" 
                label="Your Answer"
                :prepend-inner-icon="correct ? 'mdi-check-circle' : incorrect ? 'mdi-close-circle' : ''"
                :error="incorrect"
                :persistent-hint="true"
                :hint="incorrect && !correct ? 'Please try again!' : ''"
                variant="outlined" 
                :disabled="correct || checking"
                :loading="checking"
                class="ma-3"
              >
              </v-text-field>

              <v-btn @click="checkAnswer()" 
              v-if="!correct" 
              :disabled="correct || checking" 
              :loading="checking"
              variant="flat" 
              size="large" 
              color="black" 
              prepend-icon="mdi-send">
                Check Answer
              </v-btn>

              <v-alert
                v-if="correct"
                type="success"
                title="Well Done"
                text="You have successfully completed this hint!"
                variant="tonal"
              ></v-alert>

              <v-col v-if="hint.userScore" class="justify-center align-center ma-1">
                <h2>You Scored</h2>
                <v-chip class="ma-1" :color="ScoreUtility.scoreToColour(hint.userScore, hint.maxValue)">{{ hint.userScore }}</v-chip>
                {{ `/ ${hint.maxValue}` }}
              </v-col>

              <v-expansion-panels v-if="hint.userScore" variant="popout">
                <v-expansion-panel
                  title="Answers"
                >
                  <v-expansion-panel-text>
                    <v-table>
                      <thead>
                      <tr>
                        <th class="text-center">
                        Answer
                        </th>
                        <th class="text-center">
                        Points
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr
                            v-for="answerOption, index in hint.answers"
                            :key="index"
                        >
                          <td>{{ answerOption.answer }}</td>
                          <td>{{ Math.floor((Number(answerOption.percentageValue) / 100) * hint.maxValue) }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>

            <v-card-actions>
              <v-btn href="./hunt" variant="tonal" color="black" size="large" prepend-icon="mdi-arrow-left">
                Back
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-responsive>
      </v-container>
    </v-main>
  </template>
  
<script lang="ts" setup>
  import { ref, Ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { HintService } from '@/services/HintService'
  import { ResponseService } from '@/services/ResponseService'
  import { Hint } from '@/models/Hint'
  import { Answer } from '@/models/Answer'

  import store from '@/data/Store'

  import { Local, LocalProperty } from '@/data/Local'
  import router from '@/router'
  import { ScoreUtility } from '@/utilities/ScoreUtility'

  let hintId = ref(Local.getProperty(LocalProperty.SELECTED_HINT))
  let huntId = ref(Local.getProperty(LocalProperty.SELECTED_HUNT))

  let userId = ref(store.state.user.id)

  let loading = ref(false)
  let error = ref(false)

  let answer: Ref<string | null> = ref(null)
  let incorrect = ref(false)
  let correct = ref(false)
  let checking = ref(false)

  let hint: Ref<Hint | null> = ref(null)

  let breadcrumbs = ref([
    {
      title: 'Dashboard',
      disabled: false,
      href: './',
    },
    {
      title: `Hunt ${Number(huntId.value) + 1}`,
      disabled: false,
      href: './hunt',
    },
    {
      title: `View Hint`,
      disabled: true,
    },
  ])

  onMounted(async () => {
    loading.value = true

    if (!userId?.value || !hintId?.value) { 
      error.value = true
      loading.value = false
      return
    }

    await fetchHint()
  })

  const fetchHint = async () => {
    await HintService.fetchHint(Number(hintId.value), userId.value).then((result) => {
      hint.value = result

      if (!hint.value.answers || hint.value.answers.length < 1) error.value = true

      if (hint.value.userScore) { 
        correct.value = true 
        answer.value = hint.value.userAnswer
      }

      loading.value = false
    }).catch(() => {
      error.value = true
      loading.value = false
    })
  }

  const checkAnswer = async () => {
    checking.value = true

    let hintAnswers = hint.value?.answers?.flatMap((hintAnswer) => {
      return hintAnswer.answer.toLowerCase()
    })

    if (answer.value && hintAnswers?.includes(answer.value.toLowerCase().trim())) {
      loading.value = true

      await uploadAnswer()
    } else {
      incorrect.value = true
    }

    checking.value = false
  }

  const uploadAnswer = async () => {

    let filteredAnswer = hint.value?.answers?.filter((hintAnswer: Answer) => {
      if (answer.value?.toLowerCase() == hintAnswer.answer.toLowerCase()) { 
        return hintAnswer
      }
    })[0]

    if (hint.value == null || filteredAnswer == null) {
      error.value = true
      loading.value = false
      return
    }

    await ResponseService.writeResponse(hint.value, filteredAnswer.id, userId.value).catch(() => {
      error.value = true
      loading.value = false
      return
    })

    await fetchHint()

    loading.value = false
    correct.value = true
  }
</script>
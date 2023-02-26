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
          <v-card variant="outlined">
            <v-card-text>
              <h1>Hint {{ (hint.id + 1) }}</h1>
              <p class="ma-3">{{ (hint.question) }}</p>
              <v-img v-if="hint.imageUrl" :src="hint.imageUrl" height="200"></v-img>

              <v-text-field v-model="answer" 
              label="Your Answer"
              :prepend-inner-icon="correct ? 'mdi-check-circle' : incorrect ? 'mdi-close-circle' : ''"
              :error="incorrect"
              :persistent-hint="true"
              :hint="incorrect && !correct ? 'Please try again!' : ''"
              variant="outlined" 
              :disabled="correct || checking"
              :loading="checking"
              class="ma-3"></v-text-field>

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
  import { Hint } from '@/models/Hint'

  import store from '@/data/Store'

  import { Local, LocalProperty } from '@/data/Local'
  import router from '@/router'

  let hintId = ref(Local.getProperty(LocalProperty.SELECTED_HINT))

  let userId = ref(store.state.user.id)

  let loading = ref(false)
  let error = ref(false)

  let answer: Ref<string | null> = ref(null)
  let incorrect = ref(false)
  let correct = ref(false)
  let checking = ref(false)

  let hint: Ref<Hint | null> = ref(null)

  onMounted(async () => {
    loading.value = true

    if (!userId?.value || !hintId?.value) { 
      error.value = true
      loading.value = false
      return
    }

    await HintService.fetchHint(Number(hintId.value)).then((result) => {
      hint.value = result

      if (!hint.value.answers || hint.value.answers.length < 1) error.value = true

      loading.value = false
    }).catch(() => {
      error.value = true
      loading.value = false
    })
  })

  const checkAnswer = () => {
    checking.value = true

    let answers = hint.value?.answers?.flatMap((answer) => {
      return answer.answer.toLowerCase()
    })

    if (answer.value && answers?.includes(answer.value.toLowerCase())) {
      correct.value = true
    } else {
      incorrect.value = true
    }

    checking.value = false
  }
</script>
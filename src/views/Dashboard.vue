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
                <v-table class="elevation-1">
                  <thead>
                  <tr>
                      <th class="text-center">
                      Hunt Number
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
                    <td>{{ index + 1 }}</td>
                    <td>{{ hunt.endDate }}</td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <p class="font-weight-bold">{{ hunt.score }}</p>
                    </v-row>
                    </td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <p class="font-weight-bold">{{ getResult(hunt) }}</p>
                    </v-row>
                    </td>
                    <td>
                      <v-btn @click="goToHunt(hunt.id)" :prepend-icon="hunt.hasParticipation ? 'mdi-magnify' : 'mdi-plus'">{{ hunt.hasParticipation ? 'View' : 'Join' }}</v-btn>
                    </td>
                  </tr>
                  </tbody>
                </v-table>

                <v-pagination :length="1" class="ma-2"></v-pagination>
              </v-card-text>
            </v-card>

          </v-responsive>
      </v-container>
    </v-main>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { HuntService } from '@/services/HuntService'
    import { Hunt } from '@/models/Hunt'
    import store from '@/data/Store'
    import { Local, LocalProperty } from '@/data/Local'

    let router = useRouter()

    let paginationPointer = ref(0)
    let loading = ref(false)
    let error = ref(false)

    let hunts = ref(new Array<Hunt>())

    onMounted(async () => {
      loading.value = true

      let userId = store.state.user.id

      try {
        if (!userId) throw Error("UserId is Invalid")

        await HuntService.fetchHunts(userId).then((result) => {
          hunts.value = result

          loading.value = false
        })
      } catch {
        error.value = true
      }
    })

    const getResult = (result: any) => {
      return 0
    }

    const goToHunt = (huntId: number) => {
      Local.setProperty(LocalProperty.SELECTED_HUNT, huntId)

      router.push('/hunt')
    }
  </script>
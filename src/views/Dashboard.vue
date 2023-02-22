<template>
    <v-main>
      <v-container>
          <v-responsive class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <h1>Hunt Dashboard</h1>
            <h1>{{ user }}</h1>
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
                      Result
                      </th>
                      <th class="text-center">
                      Actions
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="league, index in leagues"
                      :key="index"
                  >
                    <td>{{ index }}</td>
                    <td>{{ "01/01/2023" }}</td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <p class="font-weight-bold">{{ "2/5" }}</p>
                    </v-row>
                    </td>
                    <td><v-btn href="/hunt" prepend-icon="mdi-magnify">View</v-btn></td>
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
    import { ref } from 'vue'
    import { supabase } from '@/services/Supabase'

    let leagues = ["", "", ""]
    let user: any = ref()

    try {
      // var { data: { returnedUser } } = await supabase.auth.getUser()
      // user = returnedUser
    } catch {

    }
  </script>
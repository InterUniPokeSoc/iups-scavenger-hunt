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
                      v-for="league, index in leagues"
                      :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ "01/01/2023" }}</td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <p class="font-weight-bold">{{ league }}</p>
                    </v-row>
                    </td>
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <p class="font-weight-bold">{{ getResult(league) }}</p>
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

    let leagues = [Math.floor(Math.random() * 1000), 
    Math.floor(Math.random() * 1000), 
    Math.floor(Math.random() * 1000), 
    Math.floor(Math.random() * 1000), 
    Math.floor(Math.random() * 1000), 
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)]
    let user: any = ref()

    const getResult = (result: any) => {
      var index = leagues.sort().indexOf(result)

      var scaled = Math.floor((index / leagues.length) * 100)

      return scaled
    }
  </script>
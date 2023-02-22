<template>
    <v-main>
      <v-container>
          <v-responsive class="d-flex align-center text-center fill-height" id="main-responsive-container">
            <h1>Hunt {{ huntNo + 1 }} Questions</h1>

            <v-card>
              <v-card-text>
                <v-table class="elevation-1">
                  <thead>
                  <tr>
                      <th class="text-center">
                      Question Number
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
                    <td>
                    <v-row class="justify-center align-center ma-1">
                      <v-row class="justify-center align-center ma-1">
                        <v-icon v-if="true" icon="mdi-close-circle" color="red" class="mr-1"></v-icon>
                        <v-icon v-else icon="mdi-checkbox-marked-circle" color="green" class="mr-1"></v-icon>
                        <p class="font-weight-bold">{{ false ? "Correct" : "Incorrect"}}</p>
                      </v-row>
                    </v-row>
                    </td>
                    <td><v-btn prepend-icon="mdi-pencil">Answer</v-btn></td>
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
    let huntNo = 1
    let leagues = ["", "", "", "", ""]
  </script>
<template>
  <v-main>
    <v-container>
      <v-responsive class="d-flex align-center text-center fill-height" id="main-responsive-container">
        <v-row no-gutters class="justify-center align-center">
          <v-icon icon="mdi-help-rhombus" size="x-large" class="ma-1"></v-icon>
          <h1 class="ma-1">Help</h1>
        </v-row>
        <v-container class="bg-surface">
          <v-card 
              class="justify-center align-center ma-3"
              variant="outlined"

              title="General Rules"
          >
            <v-card-text class="justify-center align-center">
              <v-list>
                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Internet Searching
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">Searching is encouraged or even required for some hints.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Groups
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">This is intended for individuals but you can complete Hunts in groups if desired.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Access Outside of I-UPS
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">This is intended for members of I-UPS only or for those with prior authorisation from Comté.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Additional Help
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">If a Hint is particularly difficult, help may be provided in the Discord server.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Discussion
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">You may share stuff related to Hints if in the relevant forum post, bare in mind this may give others an advantage.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    Sharing Answers
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap-text">DO NOT share answers (answering as a group is fine), this may result in a score of 0 being allocated.</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <v-card 
              class="justify-center align-center ma-3"
              variant="outlined"

              title="Tier System"
          >
            <v-card-text class="justify-center align-center">
              <v-list lines="one">
                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('S')">
                      S
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Achieves the Maximum Score for a Hunt</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('A')">
                      A
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Highest Scoring Participants Below the Maximum Score</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('B')">
                      B
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Top 30% of Participants</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('B')">
                      C
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Top 50% of Participants</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('D')">
                      D
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Bottom 40-49% of Participants</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('E')">
                      E
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Bottom 30-39% of Participants</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="ma-2">
                  <v-list-item-title>
                    <v-chip :color="ScoreUtility.tierToColor('F')">
                      F
                    </v-chip>
                    Tier
                  </v-list-item-title>
                  <v-list-item-subtitle>Bottom 0-29% of Participants or a Score of 0</v-list-item-subtitle>
                </v-list-item>
              </v-list>

              You will gain a tier whether you have completed the Hunt or not.
            </v-card-text>
          </v-card>
        </v-container>

      </v-responsive>
    </v-container>
  </v-main>
</template>
  
<script lang="ts" setup>
  import { ScoreUtility } from '@/utilities/ScoreUtility'
</script>

<style scoped>
.wrap-text {
  white-space: normal;
  -webkit-line-clamp: unset !important;
}
</style>
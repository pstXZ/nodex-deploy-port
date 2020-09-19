<template>
  <v-card class="ml-14 mt-8" width="900" height="100">
    <v-container>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="git">
            <SetGitDialog />
            <span class="gitAddress ml-4">{{ appInfo.repo }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import SetGitDialog from "../SetGitDialog/Index";
export default {
  components: {
    SetGitDialog
  },
  computed: mapState({
    appInfo: state => state.home.appInfo
  })
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

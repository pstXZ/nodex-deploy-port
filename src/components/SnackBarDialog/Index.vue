<template>
  <v-snackbar v-model="message.snackbar" timeout="3000" :color="message.color" top>
    {{ message.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="colse">
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    message: state => state.home.message
  }),
  methods: {
    colse() {
      this.$store.commit("home/setMessage", { snackbar: false });
    }
  }
};
</script>

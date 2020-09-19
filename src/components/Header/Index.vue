<template>
  <v-app-bar app color="primary" dark flat>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <div class="login-txt">齐 天</div>
    </div>
    <v-spacer></v-spacer>
    <v-avatar class="icon">
      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
  </v-app-bar>
</template>
<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

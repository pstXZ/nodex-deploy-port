<template>
  <v-app class="app">
    <Header />
    <div class="pageContainer">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Index.vue";

export default {
  name: "App",
  components: { Header }
};
</script>
<style scoped>
@import "./assets/css/normalize.css";
.pageContainer {
  margin-top: 3.5rem;
  padding: 1.5rem;
  height: 100%;
  font-family: LarkEmojiFont, LarkChineseQuote, -apple-system, BlinkMacSystemFont, Helvetica Neue, Tahoma, PingFang SC,
    Microsoft Yahei, Arial, Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

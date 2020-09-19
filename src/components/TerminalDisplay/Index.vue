<template>
  <v-dialog class="log-container" v-model="dialog" scrollable max-width="100%" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn width="120" outlined color="info" v-bind="attrs" v-on="on" @click="onWatch">
        查看终端日志
      </v-btn>
    </template>
    <v-card height="580">
      <v-card-title class="white black--text card-title">
        <span>轮循终端</span>
        <v-icon v-if="appStat" class="ml-4 custom-loader" light>mdi-loading</v-icon>
        <v-spacer></v-spacer>
        <v-icon class="black--text" @click="onClose">close</v-icon>
      </v-card-title>
      <v-card-text class="log-text" ref="refContent">
        <div class="log-data" v-if="list" v-html="list"></div>
        <div v-else class="no-logs">暂无日志</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    list: {
      type: String,
      default: ""
    },
    appStat: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    list(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.scrollToBottom();
      }
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(function() {
        let h = this.$refs.refContent.scrollHeight;
        this.$refs.refContent.scrollTop = h;
      });
    },
    onWatch() {
      this.$emit("onWatch");
    },
    onClose() {
      this.dialog = false;
      this.$emit("onClose");
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>

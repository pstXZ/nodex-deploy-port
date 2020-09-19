<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        设置git地址
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline ml-2">设置你的git地址</span>
      </v-card-title>
      <v-card-text class="mt-6 pb-0">
        <v-container>
          <v-text-field v-model="gitAddress" label="git地址*" required outlined dense></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">取消</v-btn>
        <v-btn color="primary" text @click="confirm">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      gitAddress: "",
      dialog: false
    };
  },
  methods: {
    async confirm() {
      const { gitAddress } = this;
      if (!gitAddress) {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "error",
          text: "请输入git地址！"
        });
        return;
      }
      let res = await this.$store.dispatch("home/setGitAddress", {
        repo: gitAddress
      });

      if (res && res.result === "ok") {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "success",
          text: "设置成功"
        });
        this.$store.commit("home/setRepo", res.data.repo);
        this.dialog = false;
      } else {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "error",
          text: "git地址设置失败，请重试！"
        });
      }
    }
  }
};
</script>

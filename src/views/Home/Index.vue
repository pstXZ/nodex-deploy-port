<template>
  <div class="home-page">
    <!-- SnackBar -->
    <SnackBarDialog />
    <v-card flat class="card-div">
      <div class="home-content">
        <!-- 项目名称 -->
        <v-list-item>
          <v-list-item-content class="mt-4 ml-10">
            <v-list-item-title class="appName"><span>leanSocket</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- 设置git地址 -->
        <SetGitAddress />
        <!-- 部署 -->
        <DeployApp />
      </div>
    </v-card>
  </div>
</template>

<script>
import DeployApp from "../../components/DeployApp/Index";
import SetGitAddress from "../../components/SetGitAddress/Index";
import SnackBarDialog from "../../components/SnackBarDialog/Index";
export default {
  components: {
    DeployApp,
    SetGitAddress,
    SnackBarDialog
  },
  async mounted() {
    const res = await this.$store.dispatch("home/getAppInfo");
    if (res && res.result === "ok") {
      let appInfo = res.data;
      this.$store.commit("home/setAppInfo", { appInfo });
    } else {
      this.$store.commit("home/setMessage", {
        snackbar: true,
        color: "error",
        text: "获取应用信息失败！"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

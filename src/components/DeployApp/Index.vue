<template>
  <v-card class="ml-14 mt-8 mb-10" width="900">
    <v-container>
      <v-list-item>
        <v-list-item-content>
          <div class="deploy-div">
            <v-btn
              class="mr-4"
              width="120"
              :loading="appStat"
              :disabled="appStat"
              color="primary"
              @click="deployApp({ appInfo })"
            >
              部署应用
              <template v-slot:loader>
                <span class="btn-loader">
                  正在部署...
                  <v-icon class="custom-loader" light>mdi-loading</v-icon>
                </span>
              </template>
            </v-btn>
            <TerminalDisplay :list="list" :appStat="appStat" @onWatch="onWatch" @onClose="onClose" />
          </div>
          <div class="appLink">
            <div class="container-div">
              <div>
                <span>容器名称：</span>
                <span id="containerName" v-if="appInfo.container">{{ appInfo.container }}</span>
                <span v-else>暂无容器</span>
              </div>
              <div class="mt-4">
                <span>网站地址：</span>
                <span id="appAddress">{{ appInfo.ip }}</span>
                <span v-if="appInfo.ip">
                  <span>
                    <v-btn class="ml-6" text small color="primary" @click="copy">
                      <span class="iconfont icon-copy icon"></span>
                    </v-btn>
                  </span>
                  <span>
                    <QrCodeDialog :appAddress="appInfo.ip" />
                  </span>
                </span>
                <span v-else>暂无地址</span>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-card>
</template>

<script>
import TerminalDisplay from "../TerminalDisplay/Index";
import QrCodeDialog from "../QrCodeDialog/Index";
import Convert from "ansi-to-html";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ip: "",
      list: "",
      btnName: "",
      container: "",
      clearTimer: null,
      loader: null,
      appStat: false
    };
  },
  props: {
    deploying: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TerminalDisplay,
    QrCodeDialog
  },
  computed: mapState({
    appInfo: state => state.home.appInfo
  }),
  watch: {
    appStat(newVal, oldVal) {
      if (newVal !== oldVal) {
        clearInterval(this.clearTimer);
      }
    }
  },
  async mounted() {
    const res = await this.$store.dispatch("home/getStat");
    console.log(res);
    if (res && res.result === "ok") {
      this.appStat = res.data.deploying;
      if (res.data.deploying) {
        this.loader = true;
      } else {
        this.loader = false;
      }
    } else {
      this.$store.commit("home/setMessage", {
        snackbar: true,
        color: "error",
        text: "无法获取当前部署状态！"
      });
    }
  },
  methods: {
    async deployApp({ appInfo }) {
      if (!appInfo.repo) {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "error",
          text: "请设置你的项目git地址或上传代码包!"
        });
        return;
      }
      this.loader = true;
      this.appStat = true;
      let res = await this.$store.dispatch("home/deployApp");
      if (res && res.result === "ok") {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "success",
          text: "部署成功！"
        });
        this.loader = false;
        this.appStat = false;
        // 获取container和ip
        let res2 = await this.$store.dispatch("home/getAppInfo");
        if (res2 && res.result === "ok") {
          let appInfo = res.data;
          this.container = appInfo.container;
          this.ip = appInfo.ip;
        } else {
          this.$store.commit("home/setMessage", {
            snackbar: true,
            color: "error",
            text: "获取IP地址失败！"
          });
        }
      } else {
        this.loader = false;
        this.appStat = false;
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "error",
          text: "部署失败！"
        });
      }
    },
    async onWatch() {
      const { appStat } = this;
      let convert = new Convert();
      this.clearTimer = setInterval(async () => {
        let res = await this.$store.dispatch("home/watchLog");
        if (res && res.result === "ok") {
          let logs = res.data.list;
          let pre = logs.join("\n");
          this.list = convert.toHtml(pre);
        } else {
          this.$store.commit("home/setMessage", {
            snackbar: true,
            color: "error",
            text: "获取日志失败，请重试！"
          });
        }
        if (!appStat) {
          clearInterval(this.clearTimer);
        }
      }, 3000);
    },
    onClose() {
      clearInterval(this.clearTimer);
    },
    copy() {
      let copyDOM = document.getElementById("appAddress"); //需要复制文字的节点
      let range = document.createRange(); //创建一个range
      window.getSelection().removeAllRanges(); //清除页面中已有的selection
      range.selectNode(copyDOM); // 选中需要复制的节点
      window.getSelection().addRange(range); // 执行选中元素
      let successful = document.execCommand("copy"); // 执行 copy 操作
      if (successful) {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "success",
          text: "地址已复制到粘贴板！"
        });
      } else {
        this.$store.commit("home/setMessage", {
          snackbar: true,
          color: "error",
          text: "复制失败，请重试！"
        });
      }
      // 移除选中的元素
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

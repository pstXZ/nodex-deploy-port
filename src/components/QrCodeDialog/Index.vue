<template>
  <v-dialog class="dialog-container" v-model="dialog" max-width="300">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text small color="primary" v-bind="attrs" v-on="on" @click="handleQrCode">
        <span class="iconfont">&#xe69a;</span>
      </v-btn>
    </template>
    <v-card tile class="card-div">
      <div class="qrcode">
        <div class="code-div" ref="qrcodeDiv"></div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    appAddress: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleQrCode() {
      setTimeout(() => {
        this.$refs.qrcodeDiv.innerHTML = "";
        this._bindQRcode();
      }, 1);
    },
    _bindQRcode() {
      new QRCode(this.$refs.qrcodeDiv, {
        text: this.appAddress, // 二维码地址
        width: 140,
        height: 140,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

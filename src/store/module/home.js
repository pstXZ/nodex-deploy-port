import {
  getAppInfo,
  getStat,
  setGitAddress,
  uploadCode,
  deployApp,
  watchLog,
  register,
  getRepo
} from "../../service/home";

const state = {
  message: {
    snackbar: false, //提示框的显示与隐藏
    color: "", //提示框主题色
    text: "" //提示框内容
  },
  appInfo: {} // 应用信息
};

const mutations = {
  // 获取AppInfo
  setAppInfo(state, payload) {
    state.appInfo = payload.appInfo;
  },
  // 设置snackbar的三个参数
  setMessage(state, payload) {
    state.message.snackbar = payload.snackbar;
    state.message.color = payload.color;
    state.message.text = payload.text;
  },
  // 设置git地址
  setAddress(state, val) {
    state.gitAddress = val;
  },
  setRepo(state, val) {
    state.appInfo.repo = val;
  },
  // 设置项目代码包名称
  setFileName(state, val) {
    state.fileName = val;
  }
};

const actions = {
  //  eslint-disable-next-line no-empty-pattern
  getAppInfo({}, params) {
    return getAppInfo({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  //  eslint-disable-next-line no-empty-pattern
  getStat({}, params) {
    return getStat({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  // eslint-disable-next-line no-empty-pattern
  register({}, params) {
    return register({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  // 设置git地址
  // eslint-disable-next-line no-empty-pattern
  setGitAddress({}, params) {
    return setGitAddress({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  // eslint-disable-next-line no-empty-pattern
  getRepo({}, params) {
    return getRepo({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  // 上传代码
  // eslint-disable-next-line no-empty-pattern
  uploadCode({}, params) {
    return uploadCode({
      data: {
        ...params
      }
    });
  },
  // 部署
  // eslint-disable-next-line no-empty-pattern
  deployApp({}, params) {
    return deployApp({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  },
  // 查看日志
  // eslint-disable-next-line no-empty-pattern
  watchLog({}, params) {
    return watchLog({
      data: {
        ...params,
        appid: "00045488334b0000002e"
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

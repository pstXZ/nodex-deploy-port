import { post } from "./common";

// 获取App详情
export async function getAppInfo(config) {
  return await post(config, "info");
}

// 获取App状态
export async function getStat(config) {
  return await post(config, "stat");
}

// 设置repo
export async function setGitAddress(config) {
  return await post(config, "set_repo");
}

// 上传代码
export async function uploadCode(config) {
  return await post(config, "up_code");
}

// 部署
export async function deployApp(config) {
  return await post(config, "deploy");
}

// 查看日志
export async function watchLog(config) {
  return await post(config, "logs");
}

// 注册
export async function register(config) {
  return await post(config, "register");
}

// 获取repo
export async function getRepo(config) {
  return await post(config, "get_repo");
}

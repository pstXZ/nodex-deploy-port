import { REQUEST_DOMAIN, TOKEN_STORAGE_KEY, UID_STORAGE_KEY } from "./constants";
import { gotoLogin, getToken, getQueryVariable } from "./util";
import { getData } from "./storage";

const axios = require("axios");

const RPC = (config = {}) => {
  const { type = "post", operate = "", data = {} } = config;
  const url = `${REQUEST_DOMAIN}/${operate}`;
  const token = getData(TOKEN_STORAGE_KEY) || getToken();
  const uid = getData(UID_STORAGE_KEY) || getQueryVariable("uid");

  if (!token) {
    return gotoLogin();
  }

  return new Promise(resolve => {
    axios({
      method: type,
      url,
      responseType: "json",
      data: {
        ...data,
        token,
        uid
      }
    })
      .then((response = {}) => {
        const { data } = response;
        const { result } = data;

        if (result === "ERR_TOKEN_INVALID") {
          return gotoLogin();
        }

        console.log("[request response]:", response);
        if (result === "ok") {
          resolve(data);
        } else {
          resolve(response);
        }
      })
      .catch(err => {
        console.log("[request response error]:", err);
        resolve(err);
      });
  });
};

export default RPC;

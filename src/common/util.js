import { LOGIN_URL } from "./constants";

export function gotoLogin() {
  const refer = window.location.href;

  window.location.href = `${LOGIN_URL}?refer=${encodeURIComponent(refer)}`;
}

export function getQueryVariable(variable) {
  var splitArr = window.location.href.split("?");
  var query = splitArr.length > 1 ? splitArr[1] : "";
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return "";
}

export function getToken() {
  const token = getQueryVariable("token");

  return token && decodeURIComponent(token);
}

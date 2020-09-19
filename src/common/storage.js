export function setData(key, data) {
  if (key) {
    window.localStorage.setItem(key, data);
  }
}

export function getData(key) {
  if (key) {
    return window.localStorage.getItem(key);
  }
  return null;
}

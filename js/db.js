// Database sederhana pakai localStorage
const DB = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

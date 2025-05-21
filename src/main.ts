import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/tailwind.css";

const app = createApp(App);

// const options: PluginOptions = {
const options = {
  position: "top-right",
  timeout: 3000,
};

app.use(router);
app.use(Toast, options);

app.mount("#app");

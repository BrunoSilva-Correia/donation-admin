import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DonationView from "../views/DonationView.vue";
import BeneficiaryView from "../views/BeneficiaryView.vue";
import DonatorView from "../views/DonatorView.vue";
import RequestView from "../views/RequestView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  { path: "/donator", component: DonatorView },
  { path: "/donation", component: DonationView },
  { path: "/beneficiary", component: BeneficiaryView },
  { path: "/request", component: RequestView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

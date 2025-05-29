import axios from "axios";
import { useToast } from "vue-toastification";
import { authService } from "./authService";

const toast = useToast();

const api = axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      console.error("Network error");
    } else {
      const status = response.status;
      const message = getMessage(response.data?.message);

      switch (status) {
        case 400:
          toast.error("Invalid request: \n" + message);
          break;
        case 401:
          toast.error("Invalid credentials");
          authService.logout();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          break;
        case 404:
          toast.error("Not found: \n" + message);
          break;
        case 500:
          toast.error("Internal server error: \n" + message);
          break;
        default:
          toast.error(message);
          break;
      }
    }

    return Promise.reject(error);
  }
);

const getMessage = (message: unknown) => {
  if (!message) {
    return "Something went wrong";
  }

  if (Array.isArray(message)) {
    return message.map((msg) => `• ${msg.trim()}`).join("\n");
  }

  return message;
};

export default api;

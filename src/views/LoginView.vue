<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Enter credentials</h1>
      <form @submit.prevent="handleLogin" class="form">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { authService } from "@/services/authService";
import { LoginCredentials } from "@/types/auth";
import router from "@/router";
import { userService } from "@/services/userService";

export default defineComponent({
  name: "LoginView",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const toast = useToast();

    const handleLogin = async () => {
      const errorList: string[] = [];
      if (!email.value) {
        errorList.push("Email is required");
      }
      if (!password.value) {
        errorList.push("Password is required");
      }

      if (errorList.length) {
        toast.error(errorList.join(".\n"));
        return;
      }

      const credentials: LoginCredentials = {
        email: email.value,
        password: password.value,
      };

      const { success, data } = await authService.login(credentials);
      if (success && data) {
        localStorage.setItem("token", data.accessToken);
        const { id } = await userService.getByEmail(credentials.email);
        if (id) {
          localStorage.setItem("userId", id);
          router.push("/donation");
        } else {
          authService.logout();
        }
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/donation");
    }
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

.login-card {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;
}

input:focus {
  border-color: #007bff;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>

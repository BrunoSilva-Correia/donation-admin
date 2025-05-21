<template>
  <nav class="navbar">
    <div class="navbar-brand">Donation System</div>
    <div class="navbar-links">
      <router-link to="/donator" active-class="active">Donators</router-link>
      <router-link to="/donation" active-class="active">Donations</router-link>
      <router-link to="/beneficiary" active-class="active"
        >Beneficiaries</router-link
      >
      <router-link to="/request" active-class="active">Requests</router-link>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { authService } from "@/services/authService";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NavBar",
  setup() {
    const router = useRouter();

    const logout = () => {
      authService.logout();
      router.push("/login");
    };

    return { logout };
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 1rem 2rem;
  color: white;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.2rem;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.router-link-active,
.active {
  font-weight: bold;
  text-decoration: underline;
}

/* a.router-link-exact-active {
  color: black;
} */

a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.8;
}

button {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>

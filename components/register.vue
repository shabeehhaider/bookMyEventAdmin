<template>
  <div class="center-container">
    <div class="wrapper">
      <form @submit.prevent="handleRegister">

        <h1>Register</h1>

        <div class="input-box">
          <input type="text" placeholder="Username" v-model="username" required />
          <i class='bx bxs-user'></i>
        </div>

        <div class="input-box">
          <input type="email" placeholder="Email" v-model="email" required />
          <i class='bx bxs-envelope'></i>
        </div>

        <div class="input-box">
          <input type="password" placeholder="Password" v-model="password" required />
          <i class='bx bxs-lock-alt'></i>
        </div>

        <div class="input-box">
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
          <i class='bx bxs-lock'></i>
        </div>

        <button type="submit" class="btn">Register</button>

        <div class="login-link">
          <p>Already have an account? <NuxtLink to="/">Login</NuxtLink></p>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value === confirmPassword.value) {
    console.log("Registering with:", username.value, email.value, password.value)
    // Further registration logic here
  } else {
    alert("Passwords do not match!")
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

body, .center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

/* .center-container {
  width: 100vw;
  height: 100vh;
} */

.wrapper {
  width: 420px;
  background: white;
  border-radius: 8px;
  padding: 30px 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.wrapper h1 {
  font-size: 36px;
  text-align: center;
  color: #333;
}

.input-box {
  position: relative;
  margin: 20px 0;
}

.input-box input {
  width: 100%;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-box input::placeholder {
  color: #777;
}

.input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #777;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.login-link {
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
}

.login-link p a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.login-link p a:hover {
  text-decoration: underline;
}
</style>

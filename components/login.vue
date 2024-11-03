<template>
  <div class="wrapper">
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>

      <div class="input-box">
        <i class="bx bxs-user"></i>
        <input type="text" placeholder="Username" v-model="username" />
      </div>

      <div class="input-box">
        <i class="bx bxs-lock-alt"></i>
        <input type="password" placeholder="Password" v-model="password" />
      </div>

      <div class="remember-forget">
        <label><input type="checkbox" v-model="rememberMe" /> Remember me</label>
      </div>

      <button type="submit" class="btn">Login</button>
      
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app' // import useRuntimeConfig

const config = useRuntimeConfig()

const username = ref('')
const password = ref('')
const rememberMe = ref( false )
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post(`${config.public.apiBaseUrl}/api/auth/login/local`, {
      email: username.value,
      password: password.value,
    })
    const { token, user } = response.data

      localStorage.setItem('user',  JSON.stringify( user )) // Persistent storage
      sessionStorage.setItem('accessToken', token.accessToken) // Session-only storage
      sessionStorage.setItem('refreshToken', token.refreshToken) // Session-only storage

    // Redirect to the dashboard or home page
    router.push({ path: '/dashboard' })
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const errorData = error.response.data
      if (errorData.emailError) {
        alert('Email wasn’t found')
      } else if (errorData.passwordError) {
        alert('Password does not match')
      }
    } else {
      alert('An unexpected error occurred')
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 20px);
}

form {
  background-color: #ffffff;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .input-box {
    position: relative;
    margin-bottom: 1.2rem;

    i {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: #888;
      font-size: 1.2rem;
    }

    input {
      width: 100%;
      padding: 10px 10px 10px 35px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        border-color: #0093E9;
        outline: none;
      }
    }
  }

  .remember-forget {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #666;

    a {
      color: #0093E9;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #006bb3;
      }
    }
  }

  .btn {
    display: inline-block;
    width: 100%;
    padding: 12px;
    background-color: #0093E9;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;

    &:hover {
      background-color: #006bb3;
    }
  }

  .register-link {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;

    a {
      color: #0093E9;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #006bb3;
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <form @submit.prevent="handleForgotPassword">
      <h1>Forgot Password</h1>

      <p class="description">
        Enter your email address below to reset your password.
      </p>

      <div class="input-box">
        <i class="bx bxs-envelope"></i>
        <input type="email" placeholder="Email" v-model="email" required />
      </div>

      <button type="submit" class="btn">Reset Password</button>

      <div class="back-to-login">
        <p>Remembered your password? <br />
          <NuxtLink to="/">Back to Login</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleForgotPassword = () => {
  console.log("Password reset link sent to:", email.value)
}
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
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
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .description {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .input-box {
    position: relative;
    margin-bottom: 1.5rem;

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

  .back-to-login {
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

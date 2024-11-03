<template>
  <div class="dashboard">
    <aside class="sidebar" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
      <button @click="toggleSidebar" class="sidebar-toggle">
        <i :class="isSidebarOpen ? 'bx bx-chevron-left' : 'bx bx-menu'"></i>
      </button>
      <nav>
        <ul>
          <li><a href="#"><i class="bx bxs-dashboard"></i> <span v-if="isSidebarOpen">Dashboard</span></a></li>
          <li><a href="#"><i class="bx bxs-user"></i> <span v-if="isSidebarOpen">Users</span></a></li>
          <li><a href="#"><i class="bx bxs-cog"></i> <span v-if="isSidebarOpen">Settings</span></a></li>
          <li><a href="#"><i class="bx bxs-bar-chart-alt-2"></i> <span v-if="isSidebarOpen">Reports</span></a></li>
        </ul>
      </nav>
    </aside>

    <section class="content">
      <header class="content-header">
        <div class="header-content">
          <h1>Admin Dashboard</h1>
          <div class="user-info">
            <span>Welcome, {{ userData?.username || 'Admin' }}</span>
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
        </div>
      </header>
      <div class="content-body">
        <h2>Customer Details</h2>
        <CustomerTable />        
<slot />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomerTable from '@/components/CustomerTable.vue'
import { useRuntimeConfig } from '#app' // import useRuntimeConfig

const config = useRuntimeConfig()


const router = useRouter()
const isSidebarOpen = ref(true)
const userData = ref(null)

// Retrieve user data from localStorage on component mount
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    userData.value = user
  }
})

// Toggle Sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Logout function
function logout() {
  localStorage.removeItem('user')
  sessionStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #0d0c22;
  color: #fff;
  padding: 1rem;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 30px;
}

.sidebar-toggle {
  display: block;
  margin-bottom: 1rem;
  background: none;
  color: #ddd;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
  text-align: right;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin: 1rem 0;
  display: flex;
  align-items: center;
}

nav ul li a {
  color: #ddd;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #fff;
}

nav ul li a i {
  font-size: 1.2rem;
  margin-right: 1rem;
}

.sidebar-collapsed nav ul li a span {
  display: none; /* Hide text when sidebar is collapsed */
}

/* Content Section Styles */
.content {
  flex-grow: 1;
  padding: 1rem;
  transition: margin-left 0.3s;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0093E9;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 1rem;
}

.logout-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.content-body {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

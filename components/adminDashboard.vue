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
        <h1>Admin Dashboard</h1>
      </header>
      <div class="content-body">
        <p>Admin content here</p>
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSidebarOpen = ref(true)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
.sidebar-toggle {
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.sidebar-toggle:hover {
  color: #fff;
}
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
  background-color: #0093E9;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.content-body {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.sidebar-collapsed .sidebar-toggle{
  text-align: left;
  padding: 0;
}
</style>

<template>
  <div>
    <table class="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Tickets</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.gender }}</td>
          <td>{{ customer.phoneNumber }}</td>
          <td>{{ customer.status }}</td>
          <td>
            <ul v-if="customer.Tickets && customer.Tickets.length">
              <li v-for="ticket in customer.Tickets" :key="ticket.id">
                <strong>{{ ticket.eventName }}</strong> - {{ formatDate(ticket.eventDate) }} - AED {{ ticket.price }} - {{ ticket.status }}
              </li>
            </ul>
            <span v-else>No Tickets</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app' // import useRuntimeConfig

const config = useRuntimeConfig()
import axios from 'axios'

const customers = ref([])

// Fetch customers with ticket information on component mount
onMounted(async () => {
  try {
    const response = await axios.get(`${config.public.apiBaseUrl}/api/customers-with-tickets`) // Ensure this endpoint exists in your backend
    customers.value = response.data
  } catch (error) {
    console.error('Error fetching customer data:', error)
  }
})

// Date formatting function
function formatDate(value) {
  const date = new Date(value)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #fff;
}

.customer-table th, .customer-table td {
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

.customer-table th {
  background-color: #0093E9;
  color: #fff;
}

.customer-table ul {
  list-style: none;
  padding: 0;
}

.customer-table li {
  margin-bottom: 0.5rem;
}
</style>

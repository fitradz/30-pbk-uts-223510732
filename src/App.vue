<template>
  <div id="app">
    <h1>Daftar Kegiatan</h1>
    <div class="input-container">
      <input type="text" v-model="newActivity" placeholder="Tambah Kegiatan Baru">
      <button @click="addActivity">Tambah</button>
    </div>

    <ul>
      <li v-for="(activity, index) in filteredActivities" :key="index">
        <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
        <button @click="cancelActivity(index)">Batal</button>
        <button @click="toggleComplete(index)">
          {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
        </button>
        <button @click="editActivity(index)">Edit</button> <!-- Tombol Edit -->
      </li>
    </ul>

    <button @click="filterCompleted">
      {{ showOnlyIncomplete ? 'Tampilkan Semua Kegiatan' : 'Hanya Kegiatan Belum Selesai' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      showOnlyIncomplete: false
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = '';
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleComplete(index) {
      this.activities[index].completed = !this.activities[index].completed;
    },
    filterCompleted() {
      this.showOnlyIncomplete = !this.showOnlyIncomplete;
    },
    editActivity(index) { // Metode untuk mengedit kegiatan
      const newName = prompt('Masukkan nama baru untuk kegiatan:', this.activities[index].name);
      if (newName !== null && newName.trim() !== '') {
        this.activities[index].name = newName.trim();
      }
    }
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyIncomplete) {
        return this.activities.filter(activity => !activity.completed);
      } else {
        return this.activities;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  align-items:center;
}
span {
  margin-right: 10px;
}
.input-container {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px;
}

.input-container input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.input-container button {
  padding: 10px 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.completed {
  text-decoration: line-through;
}
</style>
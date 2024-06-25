<template>
  <div class="container">
    <div class="header">
      <h1>Daftar</h1>
      <h1>Kegiatan</h1>
    </div>
    <div class="input-container">
      <input type="text" v-model="newActivity" placeholder="Tambah Kegiatan Baru">
      <button @click="addActivityHandler">Tambah</button>
    </div>
    <ul>
      <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
        <span :class="{ 'completed': activity.completed }">{{ activity.name }}</span>
        <div class="button-container">
          <button @click="cancelActivity(index)">Batal</button>
          <button @click="toggleComplete(index)">
            {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
          </button>
          <button @click="editActivity(index)">Edit</button>
        </div>
      </li>
    </ul>
    <button @click="filterCompleted">
      {{ showOnlyIncomplete ? 'Tampilkan Semua Kegiatan' : 'Hanya Kegiatan Belum Selesai' }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useActivitiesStore } from '../store';

export default {
  setup() {
    const activitiesStore = useActivitiesStore();
    const newActivity = ref('');
    const showOnlyIncomplete = ref(false);

    const filteredActivities = computed(() => {
      if (showOnlyIncomplete.value) {
        return activitiesStore.activities.filter(activity => !activity.completed);
      }
      return activitiesStore.activities;
    });

    const addActivityHandler = () => {
      if (newActivity.value.trim() !== '') {
        activitiesStore.addActivity({ name: newActivity.value, completed: false });
        newActivity.value = '';
      }
    };

    const cancelActivity = (index) => {
      activitiesStore.cancelActivity(index);
    };

    const toggleComplete = (index) => {
      activitiesStore.toggleComplete(index);
    };

    const editActivity = (index) => {
      const newName = prompt('Masukkan nama baru untuk kegiatan:', activitiesStore.activities[index].name);
      if (newName !== null && newName.trim() !== '') {
        activitiesStore.activities[index].name = newName.trim();
      }
    };

    const filterCompleted = () => {
      showOnlyIncomplete.value = !showOnlyIncomplete.value;
    };

    return {
      newActivity,
      showOnlyIncomplete,
      filteredActivities,
      addActivityHandler,
      cancelActivity,
      toggleComplete,
      editActivity,
      filterCompleted
    };
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  color: white;
}

.header {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.header h1 {
  color: white;
  margin: 0;
  font-size: 50px;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.input-container input {
  padding: 10px;
  font-size: 16px;
}

.input-container button {
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.activity-item {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.activity-item span {
  flex-grow: 1;
  margin-right: 10px;
}

.button-container {
  display: flex;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
}

button {
  background-color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>

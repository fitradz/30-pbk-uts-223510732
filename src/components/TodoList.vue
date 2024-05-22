<template>
  <div>
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
        <button @click="editActivity(index)">Edit</button>
      </li>
    </ul>
    <button @click="filterCompleted">
      {{ showOnlyIncomplete ? 'Tampilkan Semua Kegiatan' : 'Hanya Kegiatan Belum Selesai' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    activities: Array,
    showOnlyIncomplete: Boolean
  },
  data() {
    return {
      newActivity: ''
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
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.$emit('addActivity', this.newActivity.trim());
        this.newActivity = '';
      }
    },
    cancelActivity(index) {
      this.$emit('cancelActivity', index);
    },
    toggleComplete(index) {
      this.$emit('toggleComplete', index);
    },
    editActivity(index) {
      this.$emit('editActivity', index);
    }
  }
}
</script>
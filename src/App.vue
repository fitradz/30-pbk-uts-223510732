<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><a href="#" @click.prevent="currentView = 'todos'">Todos</a></li>
          <li><a href="#" @click.prevent="currentView = 'posts'">Posts</a></li>
        </ul>
      </nav>
    </header>

    <div v-if="currentView === 'todos'" class="todos-container">
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

    <div v-if="currentView === 'posts'" class="posts-container">
      <h1>Postingan</h1>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul>
        <li v-for="post in filteredPosts" :key="post.id" class="post-item">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      showOnlyIncomplete: false,
      currentView: 'todos',
      users: [],
      posts: [],
      selectedUser: null
    }
  },
  created() {
    this.fetchUsers();
    this.fetchPosts();
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyIncomplete) {
        return this.activities.filter(activity => !activity.completed);
      } else {
        return this.activities;
      }
    },
    filteredPosts() {
      if (this.selectedUser) {
        return this.posts.filter(post => post.userId === this.selectedUser);
      }
      return this.posts;
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
    editActivity(index) {
      const newName = prompt('Masukkan nama baru untuk kegiatan:', this.activities[index].name);
      if (newName !== null && newName.trim() !== '') {
        this.activities[index].name = newName.trim();
      }
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => this.users = data);
    },
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => this.posts = data);
    }
  }
}
</script>

<style>
/* General Styles */
/* General Styles */
#app {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
}

/* Styles for Navigation */
header nav ul {
    list-style-type: none;
    padding: 0;
}

header nav ul li {
    display: inline-block;
    margin-right: 10px;
}

header nav ul li a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
}

/* Styles for Todos */
.todos-container {
    background-color:;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.todos-container h1 {
    margin-top: 0;
    color:#fff;
}

.todos-container .input-container {
    display: flex;
    margin-bottom: 20px;
}

.todos-container .input-container input[type="text"] {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
}

.todos-container .input-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: none;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}

.todos-container ul {
    list-style-type: none;
    padding: 0;
}

.todos-container li {
    margin-bottom: 10px;
}

.todos-container .completed {
    text-decoration: line-through;
}

/* Styles for Posts */
.posts-container {
    background-color: #e9e9e9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.posts-container h1 {
    margin-top: 0;
}

.posts-container select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

.posts-container ul {
    list-style-type: none;
    padding: 0;
}

.posts-container .post-item {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}

</style>
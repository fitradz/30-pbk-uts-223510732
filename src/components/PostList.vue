<template>
  <div class="post-list">
    <h1 class="post-title">Postingan</h1>
    <select v-model="selectedUser" class="user-select">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <ul class="posts">
      <li v-for="post in filteredPosts" :key="post.id" class="post-item">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);
    const posts = ref([]);
    const selectedUser = ref(null);

    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      users.value = response.data;
    };

    const fetchPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      posts.value = response.data;
    };

    fetchUsers();
    fetchPosts();

    const filteredPosts = computed(() => {
      if (selectedUser.value) {
        return posts.value.filter(post => post.userId === selectedUser.value);
      }
      return posts.value;
    });

    return {
      users,
      posts,
      selectedUser,
      filteredPosts
    };
  }
};
</script>

<style scoped>
.post-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.post-title {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.user-select {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.posts {
  list-style: none;
  padding: 0;
}

.post-item {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.post-item:hover {
  background-color: #f0f0f0;
}
</style>

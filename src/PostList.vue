<template>
  <div>
    <h1>Postingan</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <ul>
      <li v-for="post in filteredPosts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    posts: Array
  },
  data() {
    return {
      selectedUser: null
    }
  },
  computed: {
    filteredPosts() {
      if (this.selectedUser) {
        return this.posts.filter(post => post.userId === this.selectedUser);
      }
      return this.posts;
    }
  }
}
</script>
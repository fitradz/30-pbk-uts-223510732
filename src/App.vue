<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/TodoList">Todos</router-link></li>
          <li><router-link to="/PostList">Post</router-link></li>
          <li><router-link to="/Albums">Albums</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* General Styles */
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}
.input-container {
  display: flex;
  margin-bottom: 20px;
} 
/* Styles for Navigation */
header {
  background-color: #add8e6; /* Warna biru muda */
  padding: 10px 0;
}

header nav ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

header nav ul li {
  display: inline-block;
  margin-right: 10px;
}

header nav ul li a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 3px;
}

header nav ul li a:hover {
  background-color: #007bff;
  color: white;
}
</style>

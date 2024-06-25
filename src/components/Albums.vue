<template>
  <q-layout>
    <q-page-container>
      <div class="album-list">
        <q-page padding>
          <h1 class="text-h4 text-center text-white">Album List</h1>

          <q-list bordered separator v-if="albums.length">
            <q-item v-for="album in albums" :key="album.id" clickable class="album-item">
              <router-link :to="{ name: 'AlbumPhotos', params: { id: album.id } }" class="link full-width">
                <q-item-section>
                  <q-item-label>{{ album.title }}</q-item-label>
                </q-item-section>
              </router-link>
            </q-item>
          </q-list>

          <q-item v-else>
            <q-item-section>
              <q-spinner-dots color="primary" size="2em" />
              <q-item-label>Loading albums...</q-item-label>
            </q-item-section>
          </q-item>
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const albums = ref([]);

    onMounted(async () => {
      await fetchAlbums();
    });

    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        albums.value = response.data;
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };

    return {
      albums,
    };
  },
};
</script>

<style scoped>
.album-list {
  max-width: 600px;
  margin: auto;
}

.album-item {
  background-color: white; /* Latar belakang putih */
  border-radius: 5px; /* Sudut melengkung */
  margin-bottom: 10px; /* Jarak bawah antara item */
  padding: 10px; /* Padding dalam item */
  transition: background-color 0.3s; /* Transisi halus saat hover */
}

.album-item:hover {
  background-color: #f0f0f0; /* Warna latar belakang saat dihover */
}

.link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%; /* Pastikan link memenuhi seluruh lebar item */
}

.q-item-label {
  color: black; /* Warna teks dalam item daftar album */
}

.text-white {
  color: white !important;
}
</style>

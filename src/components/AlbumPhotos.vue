<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row items-start justify-evenly q-gutter-md">

        <div v-if="error">
          <q-banner inline-actions class="text-white bg-red">
            Error loading photos. Please try again later.
          </q-banner>
        </div>

        <div v-else-if="loading">
          <q-spinner-oval color="primary" size="5em" />
        </div>

        <div v-else v-for="photo in photos" :key="photo.id" class="photo-container">
          <q-img
            :src="photo.thumbnailUrl"
            spinner-color="white"
            style="height: 150px; max-width: 150px"
            @click="openModal(photo)"
          />
          <div class="text-caption text-center">{{ photo.title }}</div>
        </div>

        <photo-modal :photo="selectedPhoto" v-model="showModal" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import PhotoModal from './PhotoModal.vue';

export default {
  name: 'AlbumPhotos',
  components: { PhotoModal },
  setup() {
    const photos = ref([]);
    const loading = ref(true);
    const selectedPhoto = ref(null);
    const showModal = ref(false);
    const error = ref(null);
    const route = useRoute();
    const albumId = computed(() => route.params.id);

    onMounted(async () => {
      await fetchPhotos();
      loading.value = false;
    });

    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${albumId.value}/photos`
        );
        photos.value = response.data;
      } catch (err) {
        console.error('Failed to fetch photos:', err);
        error.value = err; 
      } finally {
        loading.value = false;
      }
    };

    const openModal = (photo) => {
      selectedPhoto.value = photo;
      showModal.value = true;
    };

    return { photos, loading, selectedPhoto, showModal, openModal, error };
  },
};
</script>

<style scoped>
.photo-container {
  text-align: center; 
}
</style>

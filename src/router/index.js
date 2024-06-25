import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import PostList from '../components/PostList.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/', redirect: '/TodoList' }, 
  { path: '/TodoList', component: TodoList },
  { path: '/PostList', component: PostList },
  { path: '/Albums', component: Albums }, 
  {
    path: '/Albums/:id', 
    name: 'AlbumPhotos',
    component: AlbumPhotos,
    props: (route) => ({ 
      id: Number(route.params.id) 
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// store.js
import { createPinia, defineStore } from 'pinia';

export const useActivitiesStore = defineStore({
  id: 'activities',
  state: () => ({
    activities: []
  }),
  actions: {
    addActivity(activity) {
      this.activities.push(activity);
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleComplete(index) {
      this.activities[index].completed = !this.activities[index].completed;
    }
  }
});

const pinia = createPinia();
export default pinia;

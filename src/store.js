import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      activities: []
    };
  },
  mutations: {
    addActivity(state, activity) {
      state.activities.push(activity);
    },
    cancelActivity(state, index) {
      state.activities.splice(index, 1);
    },
    toggleComplete(state, index) {
      state.activities[index].completed = !state.activities[index].completed;
    }
  },
  actions: {
    addActivity({ commit }, activity) {
      commit('addActivity', activity);
    },
    cancelActivity({ commit }, index) {
      commit('cancelActivity', index);
    },
    toggleComplete({ commit }, index) {
      commit('toggleComplete', index);
    }
  }
});
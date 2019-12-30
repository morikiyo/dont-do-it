export const state = () => ({
  list: [
    {
      id: 1,
      name: 'buy the milk',
      done: false
    },
    {
      id: 2,
      name: 'buy the Vue.js book',
      done: true
    }
  ],
  nextTaskId: 3
})

export const mutations = {
  addTask(state, { name }) {
    state.list.push({
      id: state.nextTaskId,
      name,
      done: false
    })
    state.nextTaskId++
  },
  toggleTaskStatus(state, { id }) {
    const filtered = state.list.filter((task) => {
      return task.id === id
    })
    filtered.forEach((task) => {
      task.done = !task.done
    })
  }
}

export const state = () => ({
  tasks: [
    {
      id: 1,
      name: '牛乳を買う',
      labelIds: [1, 2],
      done: false
    },
    {
      id: 2,
      name: 'Vue.jsの本を買う',
      labelIds: [1, 3],
      done: true
    }
  ],
  nextTaskId: 3,
  labels: [
    {
      id: 1,
      text: '買い物'
    },
    {
      id: 2,
      text: '食料'
    },
    { id: 3, text: '本' }
  ],
  nextLabelId: 4
})

export const mutations = {
  addTask(state, { name, labelIds }) {
    state.tasks.push({
      id: state.nextTaskId,
      name,
      labelIds,
      done: false
    })
    state.nextTaskId++
  },
  toggleTaskStatus(state, { id }) {
    const filtered = state.tasks.filter((task) => {
      return task.id === id
    })
    filtered.forEach((task) => {
      task.done = !task.done
    })
  },
  addLabel(state, { text }) {
    state.labels.push({
      id: state.nextLabelId,
      text
    })
    state.nextLabelId++
  }
}

export const state = () => ({
  all: [
    {
      id: 1,
      name: '新規タスクの追加機能を作る',
      comment: 'ボタンを押す',
      closedAt: null,
      resumeAt: null
    },
    {
      id: 2,
      name: 'Vue.jsの本を買う',
      comment: 'Vue.js入門 基礎からアプリケーション開発まで',
      closedAt: null,
      resumeAt: null
    }
  ],
  nextTaskId: 3
})

export const getters = {
  inbox(state) {
    return state.all.filter((task) => {
      return (
        task.closedAt === null &&
        (task.resumeAt === null || task.resumeAt <= new Date().getTime())
      )
    })
  },
  closed(state) {
    return state.all.filter((task) => task.closedAt !== null)
  },
  findById: (state) => (id) => {
    return state.all.find((task) => task.id === id)
  }
}

export const mutations = {
  create(state, { name, comment }) {
    state.tasks.push({
      id: state.nextTaskId,
      name,
      comment,
      closedAt: null,
      resumeAt: null
    })
    state.nextTaskId++
  },
  update(state, payload) {
    const task = state.getters.find(payload.id)
    Object.assign(task, { name: payload.name, comment: payload.comment })
  }
}

export const actions = {
  create({ commit }, attributes) {
    commit('create', {
      name: attributes.name,
      comment: attributes.comment
    })
  }
  // tasks/update
  // tasks/
}

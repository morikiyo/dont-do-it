export const state = () => ({
  tasks: {}
})

export const getters = {
  inbox(state) {
    const filteredTasks = {}
    Object.keys(state.tasks).forEach((key) => {
      const task = state.tasks[key]
      if (
        (task.closedAt === null ||
          task.closedAt === undefined ||
          task.closedAt === 0) &&
        (task.resumeAt === null ||
          task.resumeAt === undefined ||
          task.resumeAt <= Date.now())
      ) {
        filteredTasks[key] = task
      }
    })
    return filteredTasks
  },
  all(state) {
    const filteredTasks = {}
    Object.keys(state.tasks).forEach((key) => {
      const task = state.tasks[key]
      if (
        task.closedAt === null ||
        task.closedAt === undefined ||
        task.closedAt === 0
      ) {
        filteredTasks[key] = task
      }
    })
    return filteredTasks
  },
  closed(state) {
    const filteredTasks = {}
    Object.keys(state.tasks).forEach((key) => {
      const task = state.tasks[key]
      if (
        !(
          task.closedAt === null ||
          task.closedAt === undefined ||
          task.closedAt === 0
        )
      ) {
        filteredTasks[key] = task
      }
    })
    return filteredTasks
  }
}

export const mutations = {
  bindTasks(state, payload) {
    state.tasks = payload
  }
}

export const actions = {
  async bindTasks({ commit }) {
    await this.$database.ref('tasks').on('value', (snapshot) => {
      commit('bindTasks', snapshot.val())
      // TODO: binding は1回だけ行う、state が binding されてなかったら行う
    })
  },
  addTask(_, payload) {
    this.$database.ref('tasks').push(
      {
        title: payload.title,
        comment: payload.comment,
        closedAt: 0,
        resumeAt: 0
      },
      (error) => {
        if (error) {
          alert(error.message)
        }
      }
    )
  },
  updateTask({ state }, payload) {
    const original = state.tasks[payload.key]
    const attributes = {
      title: '',
      comment: '',
      closedAt: 0,
      resumeAt: 0
    }
    Object.keys(attributes).forEach((attrKey) => {
      const value = payload[attrKey]
      if (value !== undefined) {
        attributes[attrKey] = value
      } else {
        const originalValue = original[attrKey]
        if (originalValue !== undefined) {
          attributes[attrKey] = originalValue
        }
      }
    })
    this.$database.ref(`tasks/${payload.key}`).set(attributes)
  },
  closeTask({ dispatch }, { key }) {
    dispatch('updateTask', {
      key,
      closedAt: Date.now()
    })
  },
  openTask({ dispatch }, { key }) {
    dispatch('updateTask', {
      key,
      closedAt: 0
    })
  },
  resumeTaskTomorrow({ dispatch }, { key }) {
    const now = new Date()
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      4,
      0,
      0
    )
    const resumeAt = today.getTime() + 24 * 60 * 60 * 1000
    dispatch('updateTask', { key, resumeAt })
  },
  resumeTaskOff({ dispatch }, { key }) {
    dispatch('updateTask', { key, resumeAt: 0 })
  }
}

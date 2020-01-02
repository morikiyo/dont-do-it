export const state = () => ({
  all: [
    {
      id: 1,
      title: '新規タスクの追加機能を作る',
      comment: 'ボタンを押す',
      closedAt: new Date(2020, 0, 2, 5, 0, 0).getTime(),
      resumeAt: null
    },
    {
      id: 2,
      title: '表示機能を作る',
      comment: 'markdown で表示すること',
      closedAt: new Date(2020, 0, 2, 12, 43, 0).getTime(),
      resumeAt: null
    },
    {
      id: 3,
      title: 'コメントの編集機能を作る',
      comment: '',
      closedAt: new Date(2020, 0, 2, 13, 37, 0).getTime(),
      resumeAt: null
    },
    {
      id: 4,
      title: 'タイトルの編集機能を作る',
      comment: '',
      closedAt: new Date(2020, 0, 2, 14, 20, 0).getTime(),
      resumeAt: null
    },
    {
      id: 5,
      title: '「今日はしない」を作る',
      comment: 'ついでに Close も追加して',
      closedAt: new Date(2020, 0, 2, 15, 9, 0).getTime(),
      resumeAt: null
    },
    {
      id: 6,
      title: 'リファクタ：Closed はフィルタせずに別の配列に',
      comment: '',
      closedAt: null,
      resumeAt: null
    },
    {
      id: 7,
      title: 'リファクタ：不要なソースは削除する',
      comment: '',
      closedAt: null,
      resumeAt: null
    },
    {
      id: 8,
      title: 'データの永続化をする(Firebase Realtime DB)',
      comment: '',
      closedAt: null,
      resumeAt: null
    },
    {
      id: 9,
      title: 'タスクの並び替え機能を作る',
      comment: '',
      closedAt: null,
      resumeAt: null
    },
    {
      id: 10,
      title: '認証機能をつける(Firebase Authentication)',
      comment: '',
      closedAt: null,
      resumeAt: null
    }
  ],
  nextTaskId: 11
})

export const getters = {
  inbox(state) {
    return state.all.filter((task) => {
      return (
        task.closedAt === null &&
        (task.resumeAt === null || task.resumeAt <= Date.now())
      )
    })
  },
  all(state) {
    return state.all.filter((task) => task.closedAt === null)
  },
  closed(state) {
    return state.all.filter((task) => task.closedAt !== null)
  },
  findById: (state) => (id) => {
    return state.all.find((task) => task.id === id)
  }
}

export const mutations = {
  create(state, { title, comment }) {
    state.all.push({
      id: state.nextTaskId,
      title,
      comment,
      closedAt: null,
      resumeAt: null
    })
    state.nextTaskId++
  },
  update(state, payload) {
    const task = state.all.find((task) => task.id === payload.id)
    // TODO: DRY
    if (payload.title !== undefined) {
      task.title = payload.title
    }
    if (payload.comment !== undefined) {
      task.comment = payload.comment
    }
    if (payload.closedAt !== undefined) {
      task.closedAt = payload.closedAt
    }
    if (payload.resumeAt !== undefined) {
      task.resumeAt = payload.resumeAt
    }
  }
}

export const actions = {
  create({ commit }, payload) {
    commit('create', {
      title: payload.title,
      comment: payload.comment
    })
  },
  update({ commit }, payload) {
    commit('update', payload)
  },
  close({ commit }, payload) {
    commit('update', {
      id: payload.id,
      closedAt: Date.now()
    })
  },
  open({ commit }, payload) {
    commit('update', {
      id: payload.id,
      closedAt: null
    })
  },
  resumeTomorrow({ commit }, payload) {
    // TODO: locale は考慮されてる？
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
    commit('update', {
      id: payload.id,
      resumeAt
    })
  },
  resumeOff({ commit }, payload) {
    commit('update', {
      id: payload.id,
      resumeAt: null
    })
  }
}

<template>
  <div class="row m-4">
    <div class="col-12">
      <h2>Task List</h2>
      <ul class="list-group">
        <li v-for="task in tasks" v-bind:key="task.id" class="list-group-item">
          <input
            v-bind:checked="task.done"
            v-on:change="toggleTaskStatus(task)"
            type="checkbox"
          />
          {{ task.name }}
          -
          <span v-for="id in task.labelIds" v-bind:key="id">
            {{ getLabelText(id) }}
          </span>
        </li>
      </ul>
      <form v-on:submit.prevent="addTask">
        <div class="form-group">
          <input
            v-model="newTaskName"
            type="text"
            class="form-control"
            placeholder="新しいタスク"
          />
        </div>
      </form>
      <hr />
      <h2>ラベル一覧</h2>
      <ul class="list-group">
        <li
          v-for="label in labels"
          v-bind:key="label.id"
          class="list-group-item"
        >
          <input
            v-bind:value="label.id"
            v-model="newTaskLabelIds"
            type="checkbox"
          />
          {{ label.text }}
        </li>
      </ul>
      <form v-on:submit.prevent="addLabel">
        <div class="form-group">
          <input
            v-model="newLabelText"
            type="text"
            class="form-control"
            placeholder="新しいラベル"
          />
        </div>
      </form>
      <h2>ラベルでフィルタ</h2>
      <ul class="list-group">
        <li
          v-for="label in labels"
          v-bind:key="label.id"
          class="list-group-item"
        >
          <input
            v-bind:checked="label.id === filter"
            v-on:change="changeFilter(label.id)"
            type="radio"
          />
          {{ label.text }}
        </li>
        <li class="list-group-item">
          <input
            v-bind:checked="filter === null"
            v-on:change="changeFilter(null)"
            type="radio"
          />
          フィルタしない
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: '',
      newTaskLabelIds: [],
      newLabelText: ''
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks
    },
    labels() {
      return this.$store.state.labels
    },
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      })
      this.newTaskName = ''
      this.newTaskLabelIds = []
    },
    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', { id: task.id })
    },
    addLabel() {
      this.$store.commit('addLabel', {
        text: this.newLabelText
      })
      this.newLabelText = ''
    },
    getLabelText(id) {
      const label = this.labels.filter((label) => label.id === id)[0]
      return label ? label.text : ''
    },
    changeFilter(labelId) {
      this.$store.commit('changeFilter', { filter: labelId })
    }
  }
}
</script>

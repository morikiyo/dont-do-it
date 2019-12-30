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
        </li>
      </ul>
      <hr />
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: ''
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.list
    }
  },
  methods: {
    addTask() {
      this.$store.commit('tasks/addTask', { name: this.newTaskName })
      this.newTaskName = ''
    },
    toggleTaskStatus(task) {
      this.$store.commit('tasks/toggleTaskStatus', { id: task.id })
    }
  }
}
</script>

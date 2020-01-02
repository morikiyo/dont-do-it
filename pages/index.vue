<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>Tasks</h2>
      <div>
        <b-button @click="clickNewTask" variant="primary">
          New Task
        </b-button>
      </div>
    </div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="inbox">
          <b-card-text><TodoList /></b-card-text>
        </b-tab>
        <b-tab title="all">
          <b-card-text>
            <TodoList @on-resume-off="selectInbox" filter="all" />
          </b-card-text>
        </b-tab>
        <b-tab title="closed">
          <b-card-text><TodoList filter="closed"/></b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  components: {
    TodoList
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    clickNewTask() {
      // TODO: change route path to '/tasks/new'
      this.$router.push('/todos/new')
    },
    selectInbox() {
      this.tabIndex = 0
    }
  }
}
</script>

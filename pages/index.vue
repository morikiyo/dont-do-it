<template>
  <div>
    <h2>todos</h2>
    <div class="my-2 text-right">
      <b-button v-on:click="clickNewTask" variant="primary">New Task</b-button>
    </div>
    <b-card no-body>
      <b-tabs card>
        <b-card-header></b-card-header>
        <b-tab title="inbox" active>
          <b-card-text><TodoList /></b-card-text>
        </b-tab>
        <b-tab title="all">
          <b-card-text><TodoList filter="all"/></b-card-text>
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
  methods: {
    clickNewTask() {
      // TODO: change route path to '/tasks/new'
      this.$router.push('/todos/new')
    }
  }
}
</script>

<template>
  <div class="m-4">
    <h2>todos</h2>
    <button v-on:click="openModal">New Task</button>
    <ul>
      <li>inbox</li>
      <li>all</li>
      <li>closed</li>
    </ul>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  components: {
    TodoList
  },
  methods: {
    openModal() {
      alert('hello')
    }
  }
}
</script>

<template>
  <div>
    <ul class="list-group">
      <li v-for="task in tasks" v-bind:key="task.id" class="list-group-item">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  computed: {
    tasks() {
      return this.$store.getters['todo/inbox']
    }
  }
}
</script>

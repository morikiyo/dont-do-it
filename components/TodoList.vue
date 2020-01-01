<template>
  <div>
    <ul class="list-group">
      <li v-for="task in tasks" v-bind:key="task.id" class="list-group-item">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    filter: {
      type: String,
      default: 'inbox'
    }
  },
  computed: {
    tasks() {
      return this.$store.getters[`todos/${this.filter}`]
    }
  }
}
</script>

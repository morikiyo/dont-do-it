<template>
  <div class="row m-4">
    <div class="col-12">
      <h2>Task List</h2>
      <ul class="list-group">
        <li v-for="task in tasks" v-bind:key="task.id" class="list-group-item">
          <input v-bind:checked="task.done" type="checkbox" />
          {{ task.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.state.tasks.list
    }
  }
}
</script>

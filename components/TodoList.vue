<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="task in tasks"
        v-bind:key="task.id"
        class="d-flex justify-content-between align-items-center"
      >
        <b-link @click="onClickShow(task.id)" no-prefetch>
          {{ task.title }}
        </b-link>
        <b-button
          v-if="filter === 'inbox'"
          @click="resumeTomorrow(task.id)"
          size="sm"
        >
          don't do it
        </b-button>
        <b-button
          v-else-if="filter === 'all' && Date.now() < task.resumeAt"
          @click="resumeOff(task.id)"
          size="sm"
        >
          just do it
        </b-button>
      </b-list-group-item>
    </b-list-group>
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
  data() {
    return {}
  },
  computed: {
    tasks() {
      return this.$store.getters[`todos/${this.filter}`]
    }
  },
  methods: {
    onClickShow(id) {
      this.$router.push(`/todos/${id}`)
    },
    resumeTomorrow(id) {
      this.$store.dispatch('todos/resumeTomorrow', { id })
    },
    resumeOff(id) {
      this.$store.dispatch('todos/resumeOff', { id })
      this.$emit('on-resume-off')
    }
  }
}
</script>

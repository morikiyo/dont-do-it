<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(task, key) in tasks"
        v-bind:key="key"
        class="d-flex justify-content-between align-items-center"
      >
        <b-link @click="showTask(key)" no-prefetch>
          {{ task.title }}
        </b-link>
        <b-button
          v-if="filter === 'inbox'"
          @click="resumeTaskTomorrow(key)"
          size="sm"
        >
          don't do it
        </b-button>
        <b-button
          v-else-if="filter === 'all' && Date.now() < task.resumeAt"
          @click="resumeTaskOff(key)"
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
      return this.$store.getters[this.filter]
    }
  },
  methods: {
    showTask(key) {
      this.$router.push(`/tasks/${key}`)
    },
    resumeTaskTomorrow(key) {
      this.$store.dispatch('resumeTaskTomorrow', { key })
    },
    resumeTaskOff(key) {
      this.$store.dispatch('resumeTaskOff', { key })
      this.$emit('on-resume-off')
    }
  }
}
</script>

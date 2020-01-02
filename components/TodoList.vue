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
        <b-button @click="onClickResumeTomorrow(task.id)" size="sm">
          don't do it
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
    onClickResumeTomorrow(id) {
      // TODO: resume at tomorrow 4:00am
      alert(id)
    }
  }
}
</script>

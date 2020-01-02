<template>
  <div>
    <b-card header-tag="header" fotter-tag="footer">
      <template v-slot:header>
        <div class="d-flex d-flex justify-content-between">
          <h4 class="mb-0">{{ task.title }}</h4>
          <div>
            <b-button size="sm" variant="outline-secondary">Edit</b-button>
            <b-button
              @click="$router.push('/todos/new')"
              size="sm"
              variant="primary"
            >
              New Task
            </b-button>
          </div>
        </div>
      </template>
      <b-card-text>
        <div>
          {{ task.comment }}
        </div>
      </b-card-text>
      <template v-slot:footer>
        <div class="d-flex d-flex justify-content-between">
          <b-link @click="$router.back()">Back</b-link>
          <b-link>Edit</b-link>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'TaskShow',
  props: {
    dataId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      task: {
        title: '',
        comment: '',
        resumeAt: null,
        closedAt: null
      }
    }
  },
  computed: {},
  mounted() {
    this.task = this.$store.getters['todos/findById'](this.dataId)
  },
  updated() {
    this.task = this.$store.getters['todos/findById'](this.dataId)
  }
}
</script>

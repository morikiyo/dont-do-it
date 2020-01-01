<template>
  <div>
    <h2>New Task</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Title"
        />
      </b-form-group>
      <b-form-group>
        <b-form-textarea
          id="comment"
          v-model="form.comment"
          placeholder="Comment"
          rows="6"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
      <b-button href="/" variant="outline-secondary">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        comment: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('todos/create', this.form)
      this.$router.push('/')
    }
  }
}
</script>

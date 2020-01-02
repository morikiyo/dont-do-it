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
        <b-card class="mt-2">
          <b-card-text>
            <div v-html="$md.render(form.comment)"></div>
          </b-card-text>
        </b-card>
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
      <b-button @click="$router.back()" variant="outline-secondary">
        Cancel
      </b-button>
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
    // clear() {
    //   this.form = {
    //     title: '',
    //     comment: ''
    //   }
    // },
    onSubmit() {
      this.$store.dispatch('tasks/create', this.form)
      // this.$bvToast.toast('Created new task.')
      this.$router.push('/')
    }
  }
}
</script>

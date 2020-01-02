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
        <div v-if="commentIsShowing" v-html="$md.render(task.comment)"></div>
        <div v-else>
          <b-form-group>
            <b-form-textarea
              v-model="form.comment.value"
              rows="5"
            ></b-form-textarea>
            <b-card class="mt-2">
              <b-card-text>
                <div v-html="$md.render(form.comment.value)"></div>
              </b-card-text>
            </b-card>
          </b-form-group>
          <b-button @click="saveComment" variant="primary">Save</b-button>
          <b-button @click="cancelEditingComment" variant="outline-secondary">
            Cancel
          </b-button>
        </div>
      </b-card-text>
      <template v-slot:footer>
        <div class="d-flex d-flex justify-content-between">
          <b-link @click="$router.back()">Back</b-link>
          <b-link v-if="commentIsShowing" @click="editComment">
            Edit
          </b-link>
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
      form: {
        comment: {
          isEditing: false,
          value: ''
        }
      }
    }
  },
  computed: {
    task() {
      return this.$store.getters['todos/findById'](this.dataId)
    },
    // commentIsEditing() {
    //   return this.form.comment.isEditing
    // },
    commentIsShowing() {
      return !this.form.comment.isEditing
    }
  },
  methods: {
    editComment() {
      this.form.comment.value = this.task.comment
      this.form.comment.isEditing = true
    },
    cancelEditingComment() {
      this.form.comment.isEditing = false
    },
    saveComment() {
      const payload = {
        id: this.dataId,
        comment: this.form.comment.value
      }
      this.$store.dispatch('todos/update', payload)
      this.cancelEditingComment()
    }
  }
}
</script>

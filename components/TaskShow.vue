<template>
  <div>
    <b-card header-tag="header" fotter-tag="footer">
      <template v-slot:header>
        <div
          v-if="titleIsShowing"
          class="d-flex align-items-center justify-content-between"
        >
          <h4 class="mb-0">{{ task.title }}</h4>
          <div>
            <b-link @click="editTitle">Edit</b-link>
          </div>
        </div>
        <div v-else class="d-flex align-items-center justify-content-between">
          <div class="flex-fill mr-2">
            <b-form-input v-model="form.title.value" type="text" width="auto" />
          </div>
          <div>
            <b-button @click="saveTitle" size="sm" variant="primary">
              Save
            </b-button>
            <b-button
              @click="cancelEditingTitle"
              size="sm"
              variant="outline-secondary"
            >
              Cancel
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
        title: {
          isEditing: false,
          value: ''
        },
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
    titleIsShowing() {
      return !this.form.title.isEditing
    },
    commentIsShowing() {
      return !this.form.comment.isEditing
    }
  },
  methods: {
    editTitle() {
      this.form.title.value = this.task.title
      this.form.title.isEditing = true
    },
    cancelEditingTitle() {
      this.form.title.isEditing = false
    },
    saveTitle() {
      const payload = {
        id: this.dataId,
        title: this.form.title.value
      }
      this.$store.dispatch('todos/update', payload)
      this.form.title.isEditing = false
    },
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
      this.form.comment.isEditing = false
    }
  }
}
</script>

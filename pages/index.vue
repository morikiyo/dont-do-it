<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>Tasks</h2>
      <div>
        <b-button href="/tasks/new" variant="primary">
          New Task
        </b-button>
      </div>
    </div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="inbox">
          <b-card-text><task-list /></b-card-text>
        </b-tab>
        <b-tab title="all">
          <b-card-text>
            <task-list @on-resume-off="selectInbox" filter="all" />
          </b-card-text>
        </b-tab>
        <b-tab title="closed">
          <b-card-text><task-list filter="closed"/></b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'

export default {
  components: {
    TaskList
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    selectInbox() {
      this.tabIndex = 0
    }
  }
}
</script>

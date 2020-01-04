<template>
  <div>
    <task-show :data-id="dataId"></task-show>
  </div>
</template>

<script>
import TaskShow from '@/components/TaskShow'

export default {
  components: {
    TaskShow
  },
  computed: {
    dataId() {
      return this.$route.params.id
    }
  }
}
</script>

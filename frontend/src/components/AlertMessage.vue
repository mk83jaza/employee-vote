<template>
  <div class="alert-container">
    <div :class="type" class="alert-dismissible fade show" role="alert">
      <strong>{{ message }}</strong>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "AlertMessage",
  props: ['alertMessage', 'alertType'],
  setup(props) {
    const type = computed(() => {
      let base = 'alert alert-';
      if (props.alertType === 'error') {
        return base + 'danger';
      }
      return props.alertType == null ? null : base + props.alertType;
    });

    return {
      message: props.alertMessage,
      type,
    }
  }
}
</script>
<style scoped>
div.alert-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
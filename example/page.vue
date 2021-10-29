<template>
  <div>
    <!-- ... -->
  </div>
</template>

<script>
import { weexRouter } from './router'
export default {
  methods: {
    jumpNext() {
      weexRouter.push('/next')
    }
  }
}
</script>
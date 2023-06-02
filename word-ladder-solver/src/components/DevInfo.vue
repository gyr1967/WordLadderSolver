<template>
  <!-- info icon -->
  <div class="info">
    <p color="white" @mouseover="open" @mouseleave="close">credits/info :)</p>
    <!-- dialog -->
    <div v-if="dialog">
      <p>Made by George Yarr using Vue JS</p>
    </div>
  </div>
</template>

<script>
import '../assets/DevInfo.css';
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

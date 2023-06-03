<template>
    <div v-if="creditsOn" :class="{ creditsOn: creditsOn }">
      <p class="info">
        Made by George Yarr using Vue JS
        <br />
        georgeyarr@outlook.com
        <button @click="copyEmail" class="clipboardButton">Copy</button>
        <br />
        Source code available on
        <a href="https://github.com/gyr1967/WordLadderSolver" target="_blank"
          >GitHub</a
        >
      </p>
    </div>
    <button color="white" @click="toggleCredits">credits/info :)</button>
</template>

<script>
export default {
  data() {
    return {
      creditsOn: false,
    };
  },
  methods: {
    toggleCredits() {
      this.creditsOn = !this.creditsOn;
    },
    copyEmail() {
      navigator.clipboard.writeText("georgeyarr@outlook.com");
    },
  },
};
</script>

<style scoped>
.info {
  font-size: 12px;
  color: rgb(195, 196, 115);
  height: 100px;
  overflow: hidden;
}

p {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.creditsOn p {
  opacity: 1;
}

button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgb(195, 196, 115);
  border: none;
  border-radius: 2px;
  color: rgb(32, 34, 34);
  padding: 1px 2px;
  text-align: center;
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 0 1px #999;
  transition: background-color 0.3s ease;
  margin-right: 5px;
    margin-bottom: 5px; 
}

button:hover {
  background-color: rgb(156, 157, 92);
}

button:active {
  background-color: rgb(105, 106, 62);
  box-shadow: 0 1px #666;
  transform: translateY(1px);
}

@media (hover: none) {
  button:hover {
    background-color: rgb(195, 196, 115);
  }
}
</style>

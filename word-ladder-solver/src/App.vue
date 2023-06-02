<template>
  <div id="app">
    <h1>Word Ladder Solver</h1>
    <p>Find the shortest path between two words by changing one letter at a time.</p>
    <p>Enter two four-letter words below to get started.</p>
    <WordLadder/>
    <DevInfo/>
  </div>
</template>

<script>
import WordLadder from './components/WordLadder.vue';
import DevInfo from './components/DevInfo.vue';
export default {
  name: 'App',
  components: {
    WordLadder,
    DevInfo,
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(195, 196, 115);
  margin-top: 10px;
}
html {
  background-color: rgb(32, 34, 34);
}
</style>

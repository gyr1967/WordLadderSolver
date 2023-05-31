<template>
  <div id="app">
    <h1>Word Ladder Solver</h1>
    <p>Find the shortest path between two words by changing one letter at a time.</p>
    <p>Enter two words below to get started.</p>
    <WordLadder/>
  </div>
</template>

<script>
import WordLadder from './components/WordLadder.vue';
export default {
  name: 'App',
  components: {
    WordLadder
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

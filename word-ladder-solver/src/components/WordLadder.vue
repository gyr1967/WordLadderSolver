<template>
  <div v-if="loading">
    <div class="loadingMessage">
      <p>Loading...</p>
      <!-- spinning circle -->
      <div class="loader"></div>
    </div>
  </div>
  <div v-else>
    <input type="text" v-model="word1" placeholder="Word 1" />
    <input type="text" v-model="word2" placeholder="Word 2" />
    <button @click="run(word1, word2)">Run</button>
    <div v-if="pathFound">
      <p>Path found!</p>
      <p>{{ stack.reverse().join(" -> ") }}</p>
    </div>
  </div>
</template>

<script>
import "../assets/WordLadder.css";
import Graph from "../graph/Graph.js";
export default {
  name: "WordLadder",
  data() {
    return {
      words: [],
      word1: "",
      word2: "",
      pathFound: false,
      stack: [],
      graph: null,
      numVertices: 0,
      index1: 0,
      index2: 0,
      loading: true,
    };
  },
  methods: {
    async fetchFile(url) {
      const response = await fetch(url);
      const text = await response.text();
      return text.split("\n"); // words are separated by a newline
    },
    async loadFile() {
      this.words = await this.fetchFile(
        "https://raw.githubusercontent.com/gyr1967/WordLadderSolver/master/fourletters.txt"
      );
      this.numVertices = this.words.length;
      this.graph = new Graph(this.numVertices);
    },
    async createGraph() {
      let uniqueCounter = 0;
      for (let word of this.words) {
        this.graph.setVertex(uniqueCounter, word);
        uniqueCounter++;
      }
      let i = 0;
      for (let word of this.words) {
        let j = 0;
        for (let wordTwo of this.words) {
          if (i !== j) {
            let mistakesAllowed = 1;
            for (let k = 0; k < word.length; k++) {
              if (word.charAt(k) !== wordTwo.charAt(k)) mistakesAllowed--;
            }
            if (mistakesAllowed === 0) this.graph.getVertex(i).addToAdjList(j);
          }
          j++;
        }
        i++;
      }
    },
    async assignIndexes() {
      let uniqueCounter = 0;
      for (let word of this.words) {
        if (word === this.word1) {
          this.index1 = uniqueCounter;
        } else if (word === this.word2) {
          this.index2 = uniqueCounter;
        }
        uniqueCounter++;
      }
    },
    async findWordLadder() {
      this.pathFound = this.graph.bfs(
        this.graph.getVertex(this.index1),
        this.graph.getVertex(this.index2)
      );
      if (this.pathFound) {
        let v = this.graph.getVertex(this.index2);
        this.stack = [];
        while (v.getWord() !== this.word1) {
          this.stack.push(v.getWord());
          v = this.graph.getVertex(v.getPredecessor());
        }
        this.stack.push(v.getWord());
      } else {
        this.stack = ["No path found"];
      }
    },
    async initialFileFetch() {
      await this.loadFile();
      await this.createGraph();
      this.loading = false;
    },
    async run(word1, word2) {
      this.word1 = word1;
      this.word2 = word2;
      await this.assignIndexes();
      await this.findWordLadder();
    },
  },
  beforeMount() {
    this.initialFileFetch();
  },
};
</script>

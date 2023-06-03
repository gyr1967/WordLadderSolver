<template>
  <div v-if="loading">
    <div class="loadingMessage">
      <p>Loading...</p>
      <div class="loader"></div>
      <!-- spinning circle -->
    </div>
  </div>

  <div v-else class="wordLadderForm">
    <input
      type="text"
      v-model="word1"
      placeholder="Word 1"
      maxlength="4"
      size="4"
    />
    <input
      type="text"
      v-model="word2"
      placeholder="Word 2"
      maxlength="4"
      size="4"
    />
    <button @click="runSolver()">Solve</button>
    <div v-if="pathFound">
      <p>Path found!</p>
      <p>{{ stack.reverse().join(" -> ").toUpperCase() }}</p>
      <!-- stack of predecessors (aka the word ladder)-->
    </div>
    <div v-else>
      <p>{{ stack[0] }}</p>
    </div>
  </div>
</template>

<script>
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
      validWords: true,
    };
  },
  methods: {
    async fetchFile(url) {
      const response = await fetch(url);
      const text = await response.text();
      return text.split("\n");
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
      let word1Found = false;
      let word2Found = false;
      let uniqueCounter = 0;
      for (let word of this.words) {
        if (word === this.word1) {
          this.index1 = uniqueCounter;
          word1Found = true;
        } else if (word === this.word2) {
          this.index2 = uniqueCounter;
          word2Found = true;
        }
        uniqueCounter++;
      }
      if (!word1Found || !word2Found) {
        this.validWords = false;
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
    async runSolver() {
      this.word1 = this.word1.toLowerCase();
      this.word2 = this.word2.toLowerCase();
      this.validWords = true;
      await this.assignIndexes();
      if (this.validWords) {
        await this.findWordLadder();
      } else {
        this.stack = ["Invalid words"];
      }
    },
  },
  async beforeMount() {
    await this.initialFileFetch();
  },
};
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid rgb(32, 34, 34);
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loadingMessage {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: rgb(195, 196, 115);
}

.wordLadderForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

input[type="text"] {
  background-color: rgb(195, 196, 115);
  color: rgb(32, 34, 34);
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 2px;
}

button {
  background-color: rgb(195, 196, 115);
  border: none;
  border-radius: 2px;
  color: rgb(32, 34, 34);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  box-shadow: 0 3px #999;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(156, 157, 92);
}

button:active {
  background-color: rgb(156, 157, 92);
  box-shadow: 0 2px #666;
  transform: translateY(4px);
}

@media (hover: none) {
  button:hover {
    background-color: rgb(195, 196, 115);
  }
}
</style>

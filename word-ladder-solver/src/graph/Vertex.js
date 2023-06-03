import AdjListNode from './AdjListNode.js';

class Vertex {
  constructor(n, word) {
    this.adjList = [];
    this.index = n;
    this.word = word;
    this.predecessor = null;
  }

  getAdjList() {
    return this.adjList;
  }

  getIndex() {
    return this.index;
  }

  setIndex(n) {
    this.index = n;
  }

  getVisited() {
    return this.visited;
  }

  setVisited(b) {
    this.visited = b;
  }

  getPredecessor() {
    return this.predecessor;
  }

  setPredecessor(n) {
    this.predecessor = n;
  }

  addToAdjList(n) {
    this.adjList.push(new AdjListNode(n));
  }

  vertexDegree() {
    return this.adjList.length;
  }

  getWord() {
    return this.word;
  }
}

export default Vertex;
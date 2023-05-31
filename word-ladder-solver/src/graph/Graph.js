import Vertex from "./Vertex.js";

class Graph {
  constructor(n) {
    this.numVertices = n;
    this.vertices = new Array(n);
    for (let i = 0; i < n; i++) {
      this.vertices[i] = new Vertex(i, null);
    }
  }

  getVertex(i) {
    return this.vertices[i];
  }

  setVertex(i, word) {
    this.vertices[i] = new Vertex(i, word);
  }

  bfs(startVertex, targetVertex) {
    for (let vertex of this.vertices) {
      vertex.setVisited(false);
    }

    let queue = [];
    let current = startVertex;
    while (current !== targetVertex) {
      current.setVisited(true);
      let adjacents = current.getAdjList();
      for (let node of adjacents) {
        let n = node.getVertexIndex();
        if (
          !this.vertices[n].getVisited() &&
          !queue.includes(this.vertices[n])
        ) {
          queue.push(this.vertices[n]);
          this.vertices[n].setPredecessor(current.getIndex());
        }
      }
      if (queue.length === 0) {
        return false;
      }
    }
  }
}

export default Graph;
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
    let visited = new Set();
    for( let v of this.vertices) {
      v.setVisited(false);
    }
    let queue = [];
    queue.push(startVertex);
    while(queue.length !== 0){
      let currentVertex = queue.shift();
      
      if(currentVertex === targetVertex) {
        return true;
      }
  
      let adjacents = currentVertex.getAdjList();
      for(let node of adjacents) {
        let n = node.getVertexIndex();
        let nextVertex = this.vertices[n];
        if(!visited.has(nextVertex)) {
          visited.add(nextVertex);
          queue.push(nextVertex);
          nextVertex.setPredecessor(currentVertex.getIndex());
        }
      }
    }
    
    return false;
  }
}

  

export default Graph;
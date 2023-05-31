class Graph{
    vertices = [];
    numVertices = 0;

    constructor(n){
        this.numVertices = n;
        for(let i = 0; i < n; i++){
            this.vertices[i] = new Vertex(i, null);
        }
    }

    getVertex(i){
        return this.vertices[i];
    }

    setVertex(i, word){
        this.vertices[i] = new Vertex(i, word);
    }

    bfs(startVertex, targetVertex){
        for(vertex of this.vertices){
            vertex.setVisited(false);
        }
        
    }
}
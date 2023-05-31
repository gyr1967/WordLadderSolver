import Graph from '../src/graph/Graph.js';

test('BFS should find a path in a graph', () => {
    let graph = new Graph(3);

    graph.setVertex(0, 'cat');
    graph.setVertex(1, 'bat');
    graph.setVertex(2, 'bam');
    
    graph.getVertex(0).addToAdjList(1);
    graph.getVertex(1).addToAdjList(2);

    expect(graph.bfs(graph.getVertex(0), graph.getVertex(2))).toBeTruthy();
});

test('BFS should not find a path in a graph', () => {
    let graph = new Graph(3);

    graph.setVertex(0, 'cat');
    graph.setVertex(1, 'dog');
    graph.setVertex(2, 'hit');
    
    expect(graph.bfs(graph.getVertex(0), graph.getVertex(2))).toBeFalsy();
});

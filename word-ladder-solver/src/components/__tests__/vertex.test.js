import Vertex from "../../graph/Vertex";
import { test, expect } from "vitest";
test('test adjacency lists add properly', () => {
    let vertex = new Vertex('cat');
    let vertex2 = new Vertex('bat');
    let vertex3 = new Vertex('bam');
    
    vertex.addToAdjList(vertex2.getIndex());
    vertex2.addToAdjList(vertex3.getIndex());

    expect(vertex.getAdjList().length).toBe(1);
    expect(vertex2.getAdjList().length).toBe(1);
}
);
import AdjListNode from "../src/graph/AdjListNode";

test('AdjListNode should have a vertex index', () => {
    let node = new AdjListNode(1);
    expect(node.getVertexIndex()).toBe(1);
});
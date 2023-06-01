import AdjListNode from "../../graph/AdjListNode";
import { test, expect } from "vitest";

test('AdjListNode should have a vertex index', () => {
    let node = new AdjListNode(1);
    expect(node.getVertexIndex()).toBe(1);
});
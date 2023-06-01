import Vertex from "../src/graph/Vertex";

test("Vertex should have an index", () => {
  let vertex = new Vertex(1, "cat");
  expect(vertex.getIndex()).toBe(1);
});

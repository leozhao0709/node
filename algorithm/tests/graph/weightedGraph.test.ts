import { WeightedGraph } from '../../src/graph/weightedGraph';

describe('weighted graph', () => {
  let graph: WeightedGraph;
  beforeEach(() => {
    /**            4
     *         A ----- B
     *      2 /         \
     *      /            \ 3
     *    /  2         3  \
     *   C ----- D ------- E
     *   \       |        /
     *    \    1 |      / 1
     *   4 \     |    /
     *      \    |  /
     *          F
     */

    graph = new WeightedGraph();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'E', 3);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('E', 'F', 1);
  });

  it('should give shortest path', () => {
    console.log(graph.shortestPath('A', 'F'));
  });
});

import { UndirectGraph } from '../../src/graph/undirectGraph';

describe('undirect graph insert and remove', () => {
  let graph;
  beforeEach(() => {
    graph = new UndirectGraph();
    graph.addVertex('Dallas');
    graph.addVertex('Tokyo');
    graph.addVertex('Aspen');
    graph.addVertex('Los Angeles');
    graph.addVertex('Hong Kong');
    graph.addEdge('Dallas', 'Tokyo');
    graph.addEdge('Dallas', 'Aspen');
    graph.addEdge('Hong Kong', 'Tokyo');
    graph.addEdge('Hong Kong', 'Dallas');
    graph.addEdge('Los Angeles', 'Hong Kong');
    graph.addEdge('Los Angeles', 'Aspen');
  });

  it('should add vertex and edge to graph correctly', () => {
    expect(graph.adjacencyList).toEqual({
      Dallas: ['Tokyo', 'Aspen', 'Hong Kong'],
      Tokyo: ['Dallas', 'Hong Kong'],
      Aspen: ['Dallas', 'Los Angeles'],
      'Los Angeles': ['Hong Kong', 'Aspen'],
      'Hong Kong': ['Tokyo', 'Dallas', 'Los Angeles']
    });
  });

  it('should not remove edge when the vertex is not in graph', () => {
    graph.removeEdge('Shanghai', 'Los Angeles');
    expect(graph.adjacencyList).toEqual({
      Dallas: ['Tokyo', 'Aspen', 'Hong Kong'],
      Tokyo: ['Dallas', 'Hong Kong'],
      Aspen: ['Dallas', 'Los Angeles'],
      'Los Angeles': ['Hong Kong', 'Aspen'],
      'Hong Kong': ['Tokyo', 'Dallas', 'Los Angeles']
    });
  });

  it('should remove vertex correctly', () => {
    graph.removeVertex('Hong Kong');
    expect(graph.adjacencyList).toEqual({
      Dallas: ['Tokyo', 'Aspen'],
      Tokyo: ['Dallas'],
      Aspen: ['Dallas', 'Los Angeles'],
      'Los Angeles': ['Aspen']
    });
  });
});

describe('undirect graph dfs and bfs', () => {
  let g: UndirectGraph;
  beforeEach(() => {
    //          A
    //        /   \
    //       B     C
    //       |     |
    //       D --- E
    //        \   /
    //          F
    g = new UndirectGraph();

    g.addVertex('A');
    g.addVertex('B');
    g.addVertex('C');
    g.addVertex('D');
    g.addVertex('E');
    g.addVertex('F');

    g.addEdge('A', 'B');
    g.addEdge('A', 'C');
    g.addEdge('B', 'D');
    g.addEdge('C', 'E');
    g.addEdge('D', 'E');
    g.addEdge('D', 'F');
    g.addEdge('E', 'F');
  });

  it('dfs recursively should give correct val', () => {
    expect(g.dfsRecursive('A')).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
  });

  it('dfs iteratively should give correct val', () => {
    expect(g.dfsIterative('A')).toEqual(['A', 'C', 'E', 'F', 'D', 'B']);
  });
});

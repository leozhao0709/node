import { UndirectGraph } from '../../src/graph/undirectGraph';

describe('undirect graph', () => {
  const graph = new UndirectGraph();
  beforeAll(() => {
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

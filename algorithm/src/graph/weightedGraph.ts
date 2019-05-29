/**
 * WeightedGraph
 */
export class WeightedGraph {
  public adjacentList: { [key: string]: Array<{ node: string; weight: number }> } = {};

  /**
   * addVertex
   */
  public addVertex(vertex) {
    if (!this.adjacentList[vertex]) {
      this.adjacentList[vertex] = [];
    }
  }

  /**
   * addEdge
   */
  public addEdge(v1: string, v2: string, weight: number) {
    this.adjacentList[v1].push({ node: v2, weight });
    this.adjacentList[v2].push({ node: v1, weight });
  }

  /**
   * shortestPath
   */
  public shortestPath(start: string, end: string) {
    const distance = {};
    const visited = {};
    const path = {};
    // 1. mark the start vertex to other vertex infinity distance.
    Object.keys(this.adjacentList).forEach(v => (v === start ? (distance[v] = 0) : (distance[v] = Infinity)));

    // 2. start track
    while (Object.keys(visited).length < Object.keys(this.adjacentList).length) {
      let nextVertex: string;

      // get the current next smallest distance vertex which has the shortest path from start vertex
      Object.keys(distance).forEach(node => {
        if (!visited[node] && (!nextVertex || distance[node] < distance[nextVertex])) {
          nextVertex = node;
        }
      });
      visited[nextVertex!] = true;
      if (nextVertex === end) {
        let node = nextVertex;
        const shortestPath: string[] = [];

        while (path[node]) {
          shortestPath.push(node);
          node = path[node];
        }
        shortestPath.push(start);
        return { path: shortestPath.reverse(), distance: distance[end] };
      } else {
        this.adjacentList[nextVertex].forEach(v => {
          if (!visited[v.node] && distance[nextVertex] + v.weight < distance[v.node]) {
            distance[v.node] = distance[nextVertex] + v.weight;
            path[v.node] = nextVertex;
          }
        });
      }
    }
  }
}

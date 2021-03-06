/**
 * UndirectGraph
 */
export class UndirectGraph {
  public adjacencyList: { [key: string]: string[] } = {};

  public addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  /**
   * isVertexInGraph
   */
  public isVertexInGraph(v: string) {
    return Object.keys(this.adjacencyList).some(v1 => v1 === v);
  }

  /**
   * isConnected
   */
  public isConnected(v1: string, v2: string) {
    if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) {
      return false;
    }
    return this.adjacencyList[v1].some(v => v === v2);
  }

  /**
   * addEdge
   */
  public addEdge(v1: string, v2: string) {
    if (!this.isConnected(v1, v2)) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }
  }

  /**
   * removeEdge
   */
  public removeEdge(v1: string, v2: string) {
    if (this.isConnected(v1, v2)) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
  }

  /**
   * removeVertex
   */
  public removeVertex(v: string) {
    if (this.isVertexInGraph(v)) {
      this.adjacencyList[v].forEach(v1 => this.removeEdge(v1, v));
      delete this.adjacencyList[v];
    }
  }

  /**
   * dfsRecursive
   */
  public dfsRecursive(vertex) {
    if (!this.isVertexInGraph(vertex)) {
      return [];
    }
    const data: string[] = [];
    const visited: { [key: string]: boolean } = {};

    const dfs = v => {
      if (!visited[v]) {
        visited[v] = true;
        data.push(v);
        this.adjacencyList[v].forEach(neighbor => dfs(neighbor));
      }
    };

    dfs(vertex);
    return data;
  }

  /**
   * dfsIterative
   */
  public dfsIterative(vertex) {
    if (!this.isVertexInGraph(vertex)) {
      return [];
    }
    const data: string[] = [];
    const stack: string[] = [];
    const visited: { [key: string]: boolean } = {};
    stack.push(vertex);

    while (stack.length > 0) {
      const curr = stack.pop()!;
      data.push(curr);
      visited[curr] = true;
      this.adjacencyList[curr].forEach(v => {
        if (!visited[v]) {
          stack.push(v);
          visited[v] = true;
        }
      });
    }
    return data;
  }
}

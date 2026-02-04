import { ElementDefinition } from "cytoscape";

export async function getAdjacencyList(nodes: ElementDefinition[], edges: ElementDefinition[]) {
  const maxId = nodes.length;
  const adjacencyList: number[][] = Array.from({ length: maxId + 1 }, () => []);
  edges.forEach(edge => {
    const { source, target } = edge.data;
    adjacencyList[source].push(target);
    adjacencyList[target].push(source);
  });
  return adjacencyList;
}

export async function getWeightedAdjacencyList(nodes: ElementDefinition[], edges: ElementDefinition[]) {
  const maxId = nodes.length;
  const adjacencyList: Array<Array<[number, number]>> =
    Array.from({ length: maxId + 1 }, () => []);
  edges.forEach(edge => {
    const { source, target, weight } = edge.data;
    adjacencyList[source].push([target, weight]);
    adjacencyList[target].push([source, weight]);
  });
  return adjacencyList;
}

export class DSU {
  private parent: number[];
  private findCnt: number;
  private unionCnt: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.findCnt = 0;
    this.unionCnt = 0;
  }

  find(x: number) {
    ++this.findCnt;
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a: number, b: number) {
    ++this.unionCnt;
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    this.parent[b] = a;
    return true;
  }
  
  isConnected(a: number, b: number) {
    return this.find(a) === this.find(b);
  }
  
  getFindCnt() {
    return this.findCnt;
  }

  getUnionCnt() {
    return this.unionCnt;
  }

}
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
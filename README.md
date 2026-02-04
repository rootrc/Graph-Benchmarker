# Graph Algorithm Visualizer

**WORK IN PROGRESS 🔧**

An interactive web application for visualizing and benchmarking graph algorithms in real time. Users can observe algorithm behaviour, compare metrics such as node and edge visits, and analyze time/space complexities.

You can find it [HERE](https://graph-benchmarker.vercel.app/)

---

## Features

- **Visual Graph Representation:** Dynamic graphs using `Cytoscape.js`.
- **Algorithm Execution:** Run graph algorithms step by step with live metric updates.
- **Metrics Display:**
  - Nodes visited
  - Edges visited
  - Max and average queue/stack sizes
  - More to be Planned
- **Interactive Controls:**
  - Start, restart algorithms
  - Adjust execution speed
  - Show/hide algorithm overlays

---

## Algorithms

- **Supported Algorithms:**
  - DFS (Depth-First Search)
  - BFS (Breadth-First Search)
  - Dijkstra's Algorithm
 
- **Planned Algorithms:**
  - A* search algorithm
  - Bellman-Ford Algorithm
  - Kruskal's Algorithm
  - Prim's Algorithm
  - Toposort
  - Khan's Algorithm
  - Diameter of a Tree
  - Radius of a Tree
  - Tarjan's Algorithm
  - Lowest Common Ancestor
  - Edmonds-Karp Algorithm

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Graph Visualization:** `react-cytoscapejs`, `cytoscape-fcose`
- **Backend:** Node.js, Express.js
- **Deployment:** Vercel, Render

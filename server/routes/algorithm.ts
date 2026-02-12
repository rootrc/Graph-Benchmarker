import { Router, Request, Response } from 'express';
import { Step } from '../algorithms/types.js';
import type { ElementDefinition } from 'cytoscape';
import { select } from './database.js';
import { dfs } from '../algorithms/dfs.js';
import { bfs } from '../algorithms/bfs.js';
import { dijkstra } from '../algorithms/dijkstra.js';
import { kruskal } from '../algorithms/kruskal.js';
import { prim } from '../algorithms/prim.js';



const router = Router();

async function runAlgorithm(
  req: Request,
  res: Response,
  algorithmFunction: (
    nodes: ElementDefinition[],
    edges: ElementDefinition[],
    onStep: (step: Step) => void,
    delay: number
  ) => Promise<void>,
) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const id = Number(req.query.graphId);
  const delay = Number(req.query.delay);

  let graphData: ElementDefinition[];
  try {
    const result = await select(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Graph not found" });
    }
    graphData = result.rows[0].graph_data.elements;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
    return;
  }

  const nodes = graphData.filter(el => el.data && !('source' in el.data));
  const edges = graphData.filter(el => el.data && 'source' in el.data);

  req.on('close', () => res.end());

  try {
    await algorithmFunction(nodes, edges, (step: Step) => {
      res.write(`data: ${JSON.stringify(step)}\n\n`);
    }, delay);
  } catch (error) {
    res.write(`Error running algorithm: ${error}\n\n`);
  }

  res.end();
}

router.get('/bfs', async (req: Request, res: Response) => {
  await runAlgorithm(req, res, bfs);
});

router.get('/dfs', async (req: Request, res: Response) => {
  await runAlgorithm(req, res, dfs);
});

router.get('/dijkstra', async (req: Request, res: Response) => {
  await runAlgorithm(req, res, dijkstra);
});

router.get('/kruskal', async (req: Request, res: Response) => {
  await runAlgorithm(req, res, kruskal);
});

router.get('/prim', async (req: Request, res: Response) => {
  await runAlgorithm(req, res, prim);
});

export default router;
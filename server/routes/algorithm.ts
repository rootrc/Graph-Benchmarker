import { Router, Request, Response } from 'express';
import { Step } from '../algorithms/types.js';
import { dfs } from '../algorithms/dfs.js';
import { bfs } from '../algorithms/bfs.js';
import { dijkstra } from '../algorithms/dijkstra.js';
import type { ElementDefinition } from 'cytoscape';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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
  delay: number = 40
) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const graphFile = req.query.graphFile as string;

  let graphData: ElementDefinition[];
  try {
    const filePath = path.join(process.cwd(), "data", graphFile);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    graphData = JSON.parse(fileContent).elements;
  } catch (error) {
    res.write(`Could not load graph file: ${graphFile}\n\n`);
    res.end();
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

export default router;
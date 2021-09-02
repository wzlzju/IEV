import { getNodeColor, processGraphData } from '@/utils/processGraphData';
import React, { useEffect, useState } from 'react';
import ForceNode from './ForceNode';
import styles from './index.less';
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

export interface IForceGraphProps {
  width: number;
  height: number;
};

const ForceGraph: React.FC<IForceGraphProps> = (props) => {
  const { width, height } = props;
  const dataSource = processGraphData(1995);
  const { nodes, links } = dataSource;

  const simulation = forceSimulation(nodes)
    .force('link', forceLink(links).id(d => (d as { id: string }).id).distance(d => ((d as unknown) as { value: number }).value))
    .force('charge', forceManyBody())
    .force('center', forceCenter());

  const [, forceUpdate] = useState<number>(0);

  useEffect(() => {
    simulation.on('tick', () => {
      forceUpdate(prev => prev + 1);
    });
  }, []);

  return (
    <svg>
      <g className={styles.links}></g>
      <g className={styles.nodes}>
        {
          nodes.map((node: any) => {
            return (
              <ForceNode
                className={styles.node}
                key={node.id}
                r={5}
                cx={node.x + node.vx}
                cy={node.y + node.vy}
                attributes={{
                  fill: getNodeColor(nodes).get(node.continent)
                }} />
            )
          })
        }
      </g>
    </svg>
  )
};

export default ForceGraph;
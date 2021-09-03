import { getNodeColor, processGraphData } from '@/utils/processGraphData';
import React, { useEffect, useMemo, useState } from 'react';
import ForceNode from './ForceNode';
import styles from './index.less';
import {
  forceSimulation,
  forceLink,
  forceCenter,
  forceCollide,
  forceRadial
} from 'd3-force';
import {
  selectAll
} from 'd3-selection';
import {
  scaleLinear
} from 'd3-scale';
import ForceLink from './ForceLink';

export interface IForceGraphProps {
  width: number;
  height: number;
};

const ForceGraph: React.FC<IForceGraphProps> = (props) => {
  const { width, height } = props;
  const dataSource = processGraphData(1995);
  const { nodes, links } = dataSource;

  // 按照expsum的值来映射节点的半径
  const minNode = useMemo(() => {
    return Math.min(...nodes.map((node: any) => node.expsum));
  }, [nodes]);
  const maxNode = useMemo(() => {
    return Math.max(...nodes.map((node: any) => node.expsum));
  }, [nodes]);

  const nodeScale = scaleLinear().domain([minNode, maxNode]).range([2, 6]);

  // 按照value值来映射边的长短
  const minLink = useMemo(() => {
    return Math.min(...links.map((link: any) => link.value));
  }, [links]);
  const maxLink = useMemo(() => {
    return Math.max(...links.map((link: any) => link.value));
  }, [links]);

  const linkScale = scaleLinear().domain([minLink, maxLink]).range([4, 8]);

  const simulation = forceSimulation(nodes)
    .force('r', forceRadial(d => ((linkScale((d as any)?.radius ?? 5)))))
    .force('charge', forceCollide().radius(10))
    .force('center', forceCenter(width / 2, height / 2))

  useEffect(() => {
    const chinaNode = nodes.filter((node: any) => node.name === 'China')[0];
    chinaNode.fx = width / 2;
    chinaNode.fy = height / 2;

    simulation.on('tick', () => {
      selectAll(`.${styles.node}`)
        .data(nodes)
        .attr("cx", d => (d as { x: number }).x)
        .attr("cy", d => (d as { y: number }).y);

      selectAll(`.${styles.link}`)
        .data(links)
        .attr("x1", d => (d as any).source.x)
        .attr("y1", d => (d as any).source.y)
        .attr("x2", d => (d as any).target.x)
        .attr("y2", d => (d as any).target.y);
    });
  }, [simulation, width, height, nodes, links]);

  return (
    <svg width={width} height={height}>
      <g className={styles.links} stroke="#999">
        {
          links.map((link: any, index: number) => {
            return (
              <ForceLink
                className={styles.link}
                key={index}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                attributes={{
                  strokeWidth: 2
                }}
              />
            )
          })
        }
      </g>
      <g className={styles.nodes}>
        {
          nodes.map((node: any, index: number) => {
            return (
              <ForceNode
                id={node.name}
                className={styles.node}
                key={node.id}
                r={nodeScale(node.expsum)}
                cx={node.x}
                cy={node.y}
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
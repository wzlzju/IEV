import {
  select
} from 'd3-selection';

// 根据id来查找link
const findLinkById = (event: MouseEvent, links: any[]) => {
  const linkId = (event.target as HTMLElement).id.slice(4);
  return links.find(link => {
    const sourceId = link.source.id;
    const targetId = link.target.id;
    return `${sourceId}_${targetId}` === linkId;
  })
};

// 获取link的完整id
const getLinkId = (node: any) => {
  const sourceId = node.source.id;
  const targetId = node.target.id;
  return `link${sourceId}_${targetId}`;
};

// 高亮link
const highlightLink = (link: any) => {
  select(`#${getLinkId(link)}`)
    .attr('stroke', 'purple');
};

// 取消高亮link
const unhighlightLink = (link: any) => {
  select(`#${getLinkId(link)}`)
    .attr('stroke', '#999');
};

export {
  findLinkById,
  getLinkId,
  highlightLink,
  unhighlightLink
};
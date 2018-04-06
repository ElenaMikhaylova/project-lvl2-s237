import _ from 'lodash';

const stringify = (data, tab) => {
  if (_.isObject(data)) {
    return _.keys(data).map(key => `{\n${'  '.repeat(tab + 2)}  ${key}: ${data[key]}\n${'  '.repeat(tab + 1)}}`);
  }
  return data;
};

const buildDiffLine = (key, value, tab, sign = ' ') =>
  `${'  '.repeat(tab)}${sign} ${key}: ${stringify(value, tab)}\n`;

const nodeRenderActions = {
  added: (node, tab) => buildDiffLine(node.key, node.value, tab, '+'),
  removed: (node, tab) => buildDiffLine(node.key, node.oldValue, tab, '-'),
  nested: (node, tab, fn) => `${'  '.repeat(tab)}  ${node.key}: ${fn(node.children, tab + 2)}\n`,
  updated: (node, tab) => [buildDiffLine(node.key, node.value, tab, '+'), buildDiffLine(node.key, node.oldValue, tab, '-')],
  unchanged: (node, tab) => buildDiffLine(node.key, node.value, tab),
};

const renderDiff = (ast, tab = 1) => {
  const result = ast.reduce((acc, node) => {
    const nodeRender = nodeRenderActions[node.type];
    return _.flatten([...acc, nodeRender(node, tab, renderDiff)]);
  }, []);
  return `{\n${result.join('')}${'  '.repeat(tab - 1)}}`;
};

export default renderDiff;

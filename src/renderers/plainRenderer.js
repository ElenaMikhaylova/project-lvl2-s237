import _ from 'lodash';

const getStringValue = (data) => {
  if (_.isObject(data)) {
    return 'complex value';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const nodeRenderPlainActions = {
  added: (node, fullKey) => `Property '${fullKey}' was added with ${_.isObject(node.value) ? '' : 'value: '}${getStringValue(node.value)}\n`,
  removed: (node, fullKey) => `Property '${fullKey}' was removed\n`,
  nested: (node, fukkLey, parent, fn) => `${fn(node.children, [...parent, [node.key]])}`,
  updated: (node, fullKey) => `Property '${fullKey}' was updated. From ${getStringValue(node.oldValue)} to ${getStringValue(node.value)}\n`,
};

const renderDiffPlain = (ast, parent = []) => {
  const result = ast.filter(node => node.type !== 'unchanged').reduce((acc, node) => {
    const fullKey = _.flatten([...parent, node.key]).join('.');
    const nodeRender = nodeRenderPlainActions[node.type];
    return [...acc, nodeRender(node, fullKey, parent, renderDiffPlain)];
  }, []);
  return result.join('');
};

export default renderDiffPlain;

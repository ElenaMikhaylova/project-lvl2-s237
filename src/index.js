import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const diffAdded = 'added';
const diffRemoved = 'removed';
const diffUpdated = 'updated';
const diffUnchanged = 'unchanged';
const diffNested = 'nested';

const getDataFromFile = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`file is not exist: ${filepath}`);
  }
  return fs.readFileSync(filepath, 'utf-8');
};

const keyParseActions = [
  {
    type: diffAdded,
    check: (data1, data2, key) => !_.has(data1, key),
    action: value => ({ value, type: diffAdded }),
  },
  {
    type: diffRemoved,
    check: (data1, data2, key) => !_.has(data2, key),
    action: (value, oldValue) => ({ oldValue, type: diffRemoved }),
  },
  {
    type: diffNested,
    check: (data1, data2, key) => _.isObject(data1[key]) && _.isObject(data2[key]),
    action: (value, oldValue, fn) => ({ children: fn(oldValue, value), type: diffNested }),
  },
  {
    type: diffUpdated,
    check: (data1, data2, key) => data1[key] !== data2[key],
    action: (value, oldValue) => ({ value, oldValue, type: diffUpdated }),
  },
  {
    type: diffUnchanged,
    check: (data1, data2, key) => data1[key] === data2[key],
    action: value => ({ value, type: diffUnchanged }),
  },
];

const parseDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  return keys.map((key) => {
    const { action } = _.find(keyParseActions, ({ check }) => check(data1, data2, key));
    return ({ key, ...action(data2[key], data1[key], parseDiff) });
  });
};

const stringify = (data, tab) => {
  if (_.isObject(data)) {
    return _.keys(data).map(key => `{\n${'  '.repeat(tab + 2)}  ${key}: ${data[key]}\n${'  '.repeat(tab + 1)}}`);
  }
  return data;
};

const buildDiffLine = (key, value, tab, sign = ' ') =>
  `${'  '.repeat(tab)}${sign} ${key}: ${stringify(value, tab)}\n`;

const nodeRenderActions = {
  [diffAdded]: (node, tab) => buildDiffLine(node.key, node.value, tab, '+'),
  [diffRemoved]: (node, tab) => buildDiffLine(node.key, node.oldValue, tab, '-'),
  [diffNested]: (node, tab, fn) => `${'  '.repeat(tab)}  ${node.key}: ${fn(node.children, tab + 2)}\n`,
  [diffUpdated]: (node, tab) => `${buildDiffLine(node.key, node.value, tab, '+')}${buildDiffLine(node.key, node.oldValue, tab, '-')}`,
  [diffUnchanged]: (node, tab) => buildDiffLine(node.key, node.value, tab),
};

const renderDiff = (ast, tab = 1) => {
  const result = ast.reduce((acc, node) => {
    const nodeRender = nodeRenderActions[node.type];
    return [...acc, nodeRender(node, tab, renderDiff)];
  }, []);
  return `{\n${result.join('')}${'  '.repeat(tab - 1)}}`;
};

const genDiff = (filepath1, filepath2) => {
  const parse = getParser(path.extname(filepath1));
  const fileContents1 = parse(getDataFromFile(filepath1));
  const fileContents2 = parse(getDataFromFile(filepath2));
  const ast = parseDiff(fileContents1, fileContents2);
  const result = renderDiff(ast);

  return `${result}\n`;
};

export default genDiff;

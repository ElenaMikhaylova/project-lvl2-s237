import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const diffAdded = 'added';
const diffRemoved = 'removed';
const diffUpdated = 'updated';

const getDataFromFile = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`file is not exist: ${filepath}`);
  }
  return fs.readFileSync(filepath, 'utf-8');
};

const parseDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  return keys.reduce((acc, key) => {
    const root = {
      key,
      value: '',
      oldValue: '',
      type: ' ',
      children: [],
    };
    const oldValue = data1[key];
    const value = data2[key];
    if (!_.has(data2, key)) {
      return [...acc, ({ ...root, oldValue, type: diffRemoved })];
    }
    if (!_.has(data1, key)) {
      return [...acc, ({ ...root, value, type: diffAdded })];
    }
    if (oldValue instanceof Object && value instanceof Object) {
      return [...acc, ({ ...root, children: parseDiff(oldValue, value) })];
    }
    if (oldValue !== value) {
      return [...acc, ({
        ...root,
        value,
        oldValue,
        type: diffUpdated,
      })];
    }
    return [...acc, ({ ...root, value })];
  }, []);
};

const stringify = (data, tab) => {
  if (data instanceof Object) {
    return _.keys(data).map(key => `{\n${'  '.repeat(tab + 2)}  ${key}: ${data[key]}\n${'  '.repeat(tab + 1)}}`);
  }
  return data;
};

const renderDiff = (ast, tab = 1) => {
  const buildDiffLine = (key, value, sign = ' ') =>
    `${'  '.repeat(tab)}${sign} ${key}: ${stringify(value, tab)}\n`;

  const result = ast.reduce((acc, node) => {
    const {
      key,
      value,
      oldValue,
      type,
      children,
    } = node;
    if (children.length === 0) {
      if (type === diffUpdated) {
        return acc.concat(buildDiffLine(key, value, '+'), buildDiffLine(key, oldValue, '-'));
      }
      if (type === diffAdded) {
        return acc.concat(buildDiffLine(key, value, '+'));
      }
      if (type === diffRemoved) {
        return acc.concat(buildDiffLine(key, oldValue, '-'));
      }
      return acc.concat(buildDiffLine(key, value));
    }
    return acc.concat(`${'  '.repeat(tab)}  ${key}: ${renderDiff(children, tab + 2)}\n`);
  }, '');
  return `{\n${result}${'  '.repeat(tab - 1)}}`;
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

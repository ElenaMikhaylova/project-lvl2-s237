import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

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
      diff: ' ',
      children: [],
    };
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data2, key)) {
      return [...acc, ({ ...root, value: value1, diff: '-' })];
    }
    if (!_.has(data1, key)) {
      return [...acc, ({ ...root, value: value2, diff: '+' })];
    }
    if (value1 instanceof Object && value2 instanceof Object) {
      return [...acc, ({ ...root, children: parseDiff(value1, value2) })];
    }
    if (value1 !== value2) {
      return [...acc, ({ ...root, value: value2, diff: '+' }), ({ ...root, value: value1, diff: '-' })];
    }
    return [...acc, ({ ...root, value: value1 })];
  }, []);
};

const stringify = (data, tab) => {
  if (data instanceof Object) {
    return _.keys(data).map(key => `{\n${'  '.repeat(tab + 2)}  ${key}: ${data[key]}\n${'  '.repeat(tab + 1)}}`);
  }
  return data;
};

const renderDiff = (ast, tab = 1) => {
  const result = ast.reduce((acc, node) => {
    const {
      key,
      value,
      diff,
      children,
    } = node;
    if (children.length === 0) {
      return acc.concat(`${'  '.repeat(tab)}${diff} ${key}: ${stringify(value, tab)}\n`);
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

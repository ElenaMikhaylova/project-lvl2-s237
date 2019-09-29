import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers';

const getDataFromFile = (filepath) => {
//  if (!fs.existsSync(filepath)) {
//    throw new Error(`file is not exist: ${filepath}`);
//  }
  return fs.readFileSync(filepath, 'utf-8');
};

const keyParseActions = [
  {
    check: (data1, data2, key) => !_.has(data1, key),
    action: value => ({ value, type: 'added' }),
  },
  {
    check: (data1, data2, key) => !_.has(data2, key),
    action: (value, oldValue) => ({ oldValue, type: 'removed' }),
  },
  {
    check: (data1, data2, key) => _.isObject(data1[key]) && _.isObject(data2[key]),
    action: (value, oldValue, fn) => ({ children: fn(oldValue, value), type: 'nested' }),
  },
  {
    check: (data1, data2, key) => data1[key] !== data2[key],
    action: (value, oldValue) => ({ value, oldValue, type: 'updated' }),
  },
  {
    check: (data1, data2, key) => data1[key] === data2[key],
    action: value => ({ value, type: 'unchanged' }),
  },
];

const parseDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  return keys.map((key) => {
    const { action } = _.find(keyParseActions, ({ check }) => check(data1, data2, key));
    return ({ key, ...action(data2[key], data1[key], parseDiff) });
  });
};

const genDiff = (beforeFilePath, afterFilePath, format = 'main') => {
  const parse = getParser(path.extname(beforeFilePath));
  const beforeFileRaw = fs.readFileSync(beforeFilePath, 'utf-8');
  const afterFileRaw = fs.readFileSync(afterFilePath, 'utf-8');
  const beforeFileData = parse(beforeFileRaw);
  const afterFileData = parse(afterFileRaw);
  const ast = parseDiff(beforeFileData, afterFileData);
  const render = getRenderer(format);
  return render(ast);
};

export default genDiff;

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

const genDiff = (filepath1, filepath2) => {
  const parse = getParser(path.extname(filepath1));
  const fileBefore = parse(getDataFromFile(filepath1));
  const fileAfter = parse(getDataFromFile(filepath2));

  const keys = _.union(_.keys(fileBefore), _.keys(fileAfter));
  const result = keys.reduce((acc, key) => {
    if (!_.has(fileAfter, key)) {
      return acc.concat(`  - ${key}: ${fileBefore[key]}`);
    }
    if (!_.has(fileBefore, key)) {
      return acc.concat(`  + ${key}: ${fileAfter[key]}`);
    } else if (fileBefore[key] !== fileAfter[key]) {
      return acc.concat(`  + ${key}: ${fileAfter[key]}`, `  - ${key}: ${fileBefore[key]}`);
    }
    return acc.concat(`    ${key}: ${fileAfter[key]}`);
  }, []);
  return `{\n${result.join('\n')}\n}\n`;
};

export default genDiff;

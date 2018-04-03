import _ from 'lodash';
import program from 'commander';
import { safeLoad as parseYaml } from 'js-yaml';
import path from 'path';
import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  if (!(fs.existsSync(filepath1) && fs.existsSync(filepath2))) {
    return undefined;
  }

  const fileParsers = [
    {
      name: '.json',
      parse: arg => JSON.parse(fs.readFileSync(arg)),
    },
    {
      name: '.yaml',
      parse: arg => parseYaml(fs.readFileSync(arg, 'utf8')),
    },
  ];
  const fileBefore = _.find(fileParsers, ['name', path.extname(filepath1)]).parse(filepath1);
  const fileAfter = _.find(fileParsers, ['name', path.extname(filepath2)]).parse(filepath2);

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

export const setProgramOptions = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      const result = genDiff(firstConfig, secondConfig);
      console.log(result);
    });

  program.parse(process.argv);
};

export default genDiff;

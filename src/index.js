import _ from 'lodash';
import program from 'commander';

const fs = require('fs');

const genDiff = (filepath1, filepath2) => {
  if (!(fs.existsSync(filepath1) && fs.existsSync(filepath2))) {
    return undefined;
  }
  const jsonBefore = JSON.parse(fs.readFileSync(filepath1));
  const jsonAfter = JSON.parse(fs.readFileSync(filepath2));
  const keys = _.union(_.keys(jsonBefore), _.keys(jsonAfter));
  const result = keys.reduce((acc, key) => {
    if (!_.has(jsonAfter, key)) {
      return acc.concat(`  - ${key}: ${jsonBefore[key]}`);
    }
    if (!_.has(jsonBefore, key)) {
      return acc.concat(`  + ${key}: ${jsonAfter[key]}`);
    } else if (jsonBefore[key] !== jsonAfter[key]) {
      return acc.concat(`  + ${key}: ${jsonAfter[key]}`, `  - ${key}: ${jsonBefore[key]}`);
    }
    return acc.concat(`    ${key}: ${jsonAfter[key]}`);
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

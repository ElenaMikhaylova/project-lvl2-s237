#!/usr/bin/env node

import program from 'commander';

export default () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format');

  program.parse(process.argv);
};

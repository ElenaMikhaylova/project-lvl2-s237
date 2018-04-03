
import genDiff from '../src/';

const fs = require('fs');

describe('Diff', () => {
  it('#genDiff', () => {
    const pathToFile1 = '__tests__/__fixtures__/before.json';
    const pathToFile2 = '__tests__/__fixtures__/after.json';
    const pathToResult = '__tests__/__fixtures__/diff1';
    const diff = genDiff(pathToFile1, pathToFile2);
    const result = fs.readFileSync(pathToResult, 'utf-8');
    expect(diff).toBe(result);
});
});

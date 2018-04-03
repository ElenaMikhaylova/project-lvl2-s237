import fs from 'fs';
import genDiff from '../src/';

describe('Diff', () => {
  const pathToResult = '__tests__/__fixtures__/diff1';
  const result = fs.readFileSync(pathToResult, 'utf-8');

  it('#json', () => {
    const pathToFile1 = '__tests__/__fixtures__/before1.json';
    const pathToFile2 = '__tests__/__fixtures__/after1.json';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result);
  });
  it('#yaml', () => {
    const pathToFile1 = '__tests__/__fixtures__/before1.yaml';
    const pathToFile2 = '__tests__/__fixtures__/after1.yaml';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result);
  });
});

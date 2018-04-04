import fs from 'fs';
import genDiff from '../src/';

describe('Diff', () => {
  const pathToResult1 = '__tests__/__fixtures__/diff1';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const pathToResult2 = '__tests__/__fixtures__/diff2';
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');

  it('#json', () => {
    const pathToFile1 = '__tests__/__fixtures__/before1.json';
    const pathToFile2 = '__tests__/__fixtures__/after1.json';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result1);
  });
  it('#yaml', () => {
    const pathToFile1 = '__tests__/__fixtures__/before1.yaml';
    const pathToFile2 = '__tests__/__fixtures__/after1.yaml';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result1);
  });
  it('#ini', () => {
    const pathToFile1 = '__tests__/__fixtures__/before1.ini';
    const pathToFile2 = '__tests__/__fixtures__/after1.ini';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result1);
  });
  it('#json tree', () => {
    const pathToFile1 = '__tests__/__fixtures__/before2.json';
    const pathToFile2 = '__tests__/__fixtures__/after2.json';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result2);
  });
  it('#yaml tree', () => {
    const pathToFile1 = '__tests__/__fixtures__/before2.yaml';
    const pathToFile2 = '__tests__/__fixtures__/after2.yaml';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result2);
  });
  it('#ini tree', () => {
    const pathToFile1 = '__tests__/__fixtures__/before2.ini';
    const pathToFile2 = '__tests__/__fixtures__/after2.ini';
    const diff = genDiff(pathToFile1, pathToFile2);
    expect(diff).toBe(result2);
  });
});

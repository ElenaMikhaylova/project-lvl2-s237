import fs from 'fs';
import genDiff from '../src/';

describe('Json', () => {
  const pathToFile1 = '__tests__/__fixtures__/before1.json';
  const pathToFile2 = '__tests__/__fixtures__/after1.json';
  const pathToResult1 = '__tests__/__fixtures__/diff1';
  const pathToResult2 = '__tests__/__fixtures__/diff1_plain';
  const pathToResult3 = '__tests__/__fixtures__/diff1_json';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  const result3 = fs.readFileSync(pathToResult3, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
  it('#json format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2, 'json')}\n`;
    expect(diff).toBe(result3);
  });
});

describe('Json tree', () => {
  const pathToFile1 = '__tests__/__fixtures__/before2.json';
  const pathToFile2 = '__tests__/__fixtures__/after2.json';
  const pathToResult1 = '__tests__/__fixtures__/diff2';
  const pathToResult2 = '__tests__/__fixtures__/diff2_plain';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
});

describe('Yaml', () => {
  const pathToFile1 = '__tests__/__fixtures__/before1.yaml';
  const pathToFile2 = '__tests__/__fixtures__/after1.yaml';
  const pathToResult1 = '__tests__/__fixtures__/diff1';
  const pathToResult2 = '__tests__/__fixtures__/diff1_plain';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
});

describe('Yaml tree', () => {
  const pathToFile1 = '__tests__/__fixtures__/before2.yaml';
  const pathToFile2 = '__tests__/__fixtures__/after2.yaml';
  const pathToResult1 = '__tests__/__fixtures__/diff2';
  const pathToResult2 = '__tests__/__fixtures__/diff2_plain';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
});

describe('Ini', () => {
  const pathToFile1 = '__tests__/__fixtures__/before1.ini';
  const pathToFile2 = '__tests__/__fixtures__/after1.ini';
  const pathToResult1 = '__tests__/__fixtures__/diff1';
  const pathToResult2 = '__tests__/__fixtures__/diff1_plain';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
});

describe('Ini tree', () => {
  const pathToFile1 = '__tests__/__fixtures__/before2.ini';
  const pathToFile2 = '__tests__/__fixtures__/after2.ini';
  const pathToResult1 = '__tests__/__fixtures__/diff2';
  const pathToResult2 = '__tests__/__fixtures__/diff2_plain';
  const result1 = fs.readFileSync(pathToResult1, 'utf-8');
  const result2 = fs.readFileSync(pathToResult2, 'utf-8');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(result1);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(result2);
  });
});

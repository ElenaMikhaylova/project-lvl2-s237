import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fixturesPath = path.join(__dirname, '__fixtures__');
const prettyExpected = fs.readFileSync(path.join(fixturesPath, 'diff1'), 'UTF-8');
const plainExpected = fs.readFileSync(path.join(fixturesPath, 'diff1_plain'), 'UTF-8');
const JSONExpected = fs.readFileSync(path.join(fixturesPath, 'diff1_json'), 'UTF-8');
const prettyTreeExpected = fs.readFileSync(path.join(fixturesPath, 'diff2'), 'UTF-8');
const plainTreeExpected = fs.readFileSync(path.join(fixturesPath, 'diff2_plain'), 'UTF-8');

describe('Json', () => {
  const pathToFile1 = path.join(fixturesPath, 'before1.json');
  const pathToFile2 = path.join(fixturesPath, 'after1.json');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainExpected);
  });
  it('#json format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2, 'json')}\n`;
    expect(diff).toBe(JSONExpected);
  });
});

describe('Json tree', () => {
  const pathToFile1 = path.join(fixturesPath, 'before2.json');
  const pathToFile2 = path.join(fixturesPath, 'after2.json');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyTreeExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainTreeExpected);
  });
});

describe('Yaml', () => {
  const pathToFile1 = path.join(fixturesPath, 'before1.yaml');
  const pathToFile2 = path.join(fixturesPath, 'after1.yaml');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainExpected);
  });
});

describe('Yaml tree', () => {
  const pathToFile1 = path.join(fixturesPath, 'before2.yaml');
  const pathToFile2 = path.join(fixturesPath, 'after2.yaml');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyTreeExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainTreeExpected);
  });
});

describe('Ini', () => {
  const pathToFile1 = path.join(fixturesPath, 'before1.ini');
  const pathToFile2 = path.join(fixturesPath, 'after1.ini');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainExpected);
  });
});

describe('Ini tree', () => {
  const pathToFile1 = path.join(fixturesPath, 'before2.ini');
  const pathToFile2 = path.join(fixturesPath, 'after2.ini');
  it('#main format', () => {
    const diff = `${genDiff(pathToFile1, pathToFile2)}\n`;
    expect(diff).toBe(prettyTreeExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFile1, pathToFile2, 'plain');
    expect(diff).toBe(plainTreeExpected);
  });
});

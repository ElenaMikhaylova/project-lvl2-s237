import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fixturesPath = path.join(__dirname, '__fixtures__');
const prettyExpected = fs.readFileSync(path.join(fixturesPath, 'diff'), 'UTF-8');
const plainExpected = fs.readFileSync(path.join(fixturesPath, 'diff_plain'), 'UTF-8');
const jsonExpected = fs.readFileSync(path.join(fixturesPath, 'diff_json'), 'UTF-8');

describe('Json', () => {
  const pathToFileBeforeJson = path.join(fixturesPath, 'before.json');
  const pathToFileAfterJson = path.join(fixturesPath, 'after.json');
  it('#main format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson);
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson, 'plain');
    expect(diff).toBe(plainExpected);
  });
  it('#json format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson, 'json');
    expect(diff).toBe(jsonExpected);
  });
});

describe('Yaml', () => {
  const pathToFileBeforeYaml = path.join(fixturesPath, 'before.yaml');
  const pathToFileAfterYaml = path.join(fixturesPath, 'after.yaml');
  it('#main format', () => {
    const diff = genDiff(pathToFileBeforeYaml, pathToFileAfterYaml);
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFileBeforeYaml, pathToFileAfterYaml, 'plain');
    expect(diff).toBe(plainExpected);
  });
});

describe('Ini', () => {
  const pathToFileBeforeIni = path.join(fixturesPath, 'before.ini');
  const pathToFileAfterIni = path.join(fixturesPath, 'after.ini');
  it('#main format', () => {
    const diff = genDiff(pathToFileBeforeIni, pathToFileAfterIni);
    expect(diff).toBe(prettyExpected);
  });
  it('#plain format', () => {
    const diff = genDiff(pathToFileBeforeIni, pathToFileAfterIni, 'plain');
    expect(diff).toBe(plainExpected);
  });
});

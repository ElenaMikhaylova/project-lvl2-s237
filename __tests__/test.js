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
  test('#main format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson);
    expect(diff).toBe(prettyExpected);
  });
  test('#plain format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson, 'plain');
    expect(diff).toBe(plainExpected);
  });
  test('#json format', () => {
    const diff = genDiff(pathToFileBeforeJson, pathToFileAfterJson, 'json');
    expect(diff).toBe(jsonExpected);
  });
});

describe('Yaml', () => {
  const pathToFileBeforeYaml = path.join(fixturesPath, 'before.yaml');
  const pathToFileAfterYaml = path.join(fixturesPath, 'after.yaml');
  test('#plain format', () => {
    const diff = genDiff(pathToFileBeforeYaml, pathToFileAfterYaml, 'plain');
    expect(diff).toBe(plainExpected);
  });
  test('#json format', () => {
    const diff = genDiff(pathToFileBeforeYaml, pathToFileAfterYaml, 'json');
    expect(diff).toBe(jsonExpected);
  });
});

describe('Ini', () => {
  const pathToFileBeforeIni = path.join(fixturesPath, 'before.ini');
  const pathToFileAfterIni = path.join(fixturesPath, 'after.ini');
  test('#main format', () => {
    const diff = genDiff(pathToFileBeforeIni, pathToFileAfterIni);
    expect(diff).toBe(prettyExpected);
  });
  test('#plain format', () => {
    const diff = genDiff(pathToFileBeforeIni, pathToFileAfterIni, 'plain');
    expect(diff).toBe(plainExpected);
  });
});

describe('Errors', () => {
  test('files not exist', () => {
    expect(() => genDiff('path1', 'path2')).toThrowError('ENOENT');
  });
  test('Wrong JSON', () => {
    const pathToFileBeforeJsonWrong = path.join(fixturesPath, 'wrong.json');
    const pathToFileAfterJson = path.join(fixturesPath, 'after.json');
    expect(() => genDiff(pathToFileBeforeJsonWrong, pathToFileAfterJson)).toThrowError(SyntaxError);
  });
});

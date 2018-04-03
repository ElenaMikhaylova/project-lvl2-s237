import { safeLoad as parseYaml } from 'js-yaml';
import ini from 'ini';

const fileParsers = {
  '.json': JSON.parse,
  '.yaml': parseYaml,
  '.ini': ini.parse,
};

export default ext => (data) => {
  const parse = fileParsers[ext];
  if (!parse) {
    throw new Error(`unknown format: ${ext}`);
  }
  return parse(data);
};

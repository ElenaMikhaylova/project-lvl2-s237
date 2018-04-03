import { safeLoad as parseYaml } from 'js-yaml';

const fileParsers = {
  '.json': JSON.parse,
  '.yaml': parseYaml,
};

export default ext => (data) => {
  const parse = fileParsers[ext];
  if (!parse) {
    throw new Error(`unknown format: ${ext}`);
  }
  return parse(data);
};

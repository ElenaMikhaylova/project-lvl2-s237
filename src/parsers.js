import { safeLoad as parseYaml } from 'js-yaml';
import ini from 'ini';
import getHandlerByType from './utils';

const fileParsers = {
  '.json': JSON.parse,
  '.yaml': parseYaml,
  '.ini': ini.parse,
};

export default ext => getHandlerByType(ext, fileParsers);

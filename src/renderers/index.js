import renderDiff from './mainRenderer';
import renderDiffPlain from './plainRenderer';
import renderDiffJson from './jsonRenderer';
import getHandlerByType from '../utils';

const renderers = {
  main: renderDiff,
  plain: renderDiffPlain,
  json: renderDiffJson,
};

export default ext => getHandlerByType(ext, renderers);

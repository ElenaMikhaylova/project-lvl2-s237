import renderDiff from './mainRenderer';
import renderDiffPlain from './plainRenderer';
import renderDiffJson from './jsonRenderer';

const renderers = {
  main: renderDiff,
  plain: renderDiffPlain,
  json: renderDiffJson,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unknown format: ${format}`);
  }
  return render(data);
};

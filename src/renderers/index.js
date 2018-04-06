import renderDiff from './mainRenderer';
import renderDiffPlain from './plainRenderer';

const renderers = {
  main: renderDiff,
  plain: renderDiffPlain,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unknown format: ${format}`);
  }
  return render(data);
};

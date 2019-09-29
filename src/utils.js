export default (type, handlers) => (...args) => {
  const handler = handlers[type];
  if (!handler) {
    throw new Error(`unknown format: ${type}`);
  }
  return handler(...args);
};

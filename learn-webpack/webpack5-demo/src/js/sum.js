export function sum(...rest) {
  return rest.reduce((pre, acc) => {
    return pre + acc;
  }, 0);
}

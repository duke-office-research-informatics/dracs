export const getViewport = () => ({
  height: window.innerHeight || document.documentElement.offsetHeight,
  width: window.innerWidth || document.documentElement.offsetWidth,
});

export const contains = (root, n) => {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};

//prgress range and animation utils
// https://gist.github.com/gre/1650294
export const getRelativeValueFromRange = (value, min, max) => {
  // console.log(value, min, max)
  const computedValue = Math.min(Math.max(min, value), max);
  return (computedValue - min) / (max - min);
};
//https://stats.stackexchange.com/a/25897
export const rescaleValue = (value, min, max) => {
  const newValue = ((100 - 0) / (max - min)) * (value - min) + 0;
  return newValue;
};

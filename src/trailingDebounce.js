export function trailingDebounce(func, delay) {
  let timeoutId;
  let context = this;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}


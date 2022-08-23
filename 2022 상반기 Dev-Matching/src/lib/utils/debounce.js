const debounce = (callback, delay = 500) => {
  let timer = null;

  return function (...args) {
    clearInterval(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

export default debounce;

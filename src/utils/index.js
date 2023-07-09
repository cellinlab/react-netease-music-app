export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "K";
  } else {
    return Math.floor(count / 10000000) / 10 + "M";
  }
};

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  }
}

export const findFirstNoTrackIndex = (list) => {
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      return i + 1;
    }
  }
}
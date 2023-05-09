const isEscapeKey = (evt) => evt.key === 'Escape';
const checkStringLength = (string, length) => string.length <= length;
const mixArray = (array) => (array.sort(() => Math.random() - 0.5));

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {isEscapeKey, checkStringLength, debounce, throttle, mixArray};

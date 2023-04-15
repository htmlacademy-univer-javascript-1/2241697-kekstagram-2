const getRandomNumber = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueId = function (a, b) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber (a, b);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber (a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getId = getUniqueId(1, 25);
const getCommentId = getUniqueId(1, 1000);
const getPhotoId = getUniqueId(1, 25);
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getId, getCommentId, getPhotoId, getRandomArrayElement};

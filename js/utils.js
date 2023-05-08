const isEscapeKey = (evt) => evt.key === 'Escape';
const checkStringLength = (string, length) => string.length <= length;

export {isEscapeKey, checkStringLength};

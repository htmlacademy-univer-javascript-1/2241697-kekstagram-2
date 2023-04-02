function getRandomInt (from, to) {

  if (from < 0 || to < 0) {
    throw new RangeError('Числа в диапазоне должны быть положительными');
  }

  if (typeof from === 'string' || typeof to === 'string') {
    throw new RangeError('Значения должны быть числами');
  }

  if (typeof from === 'number' || typeof to === 'number') {

    if (from === to) {
      return from;
    }
    if (from > to) {
      [from, to] = [to, from];
    }
    return Math.round(Math.random() * (to - from) + from);
  }
}

const isCorrectLength = (str, maxLength) => str.length <= maxLength;

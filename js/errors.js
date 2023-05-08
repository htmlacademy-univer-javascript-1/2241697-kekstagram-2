import {checkStringLength} from './utils.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_NUMBER = 5;
const COMMENT_MAX_LENGTH = 140;

const errorMessageType = {
  START_WITH: 'Хэш-тег должен начинаться с #',
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  ONLY_ONE_GRID: 'Хэш-тег не должен состоять из одной #',
  HASHTAG_MAX_LENGTH: `Максимальная длина одного хэш-тега ${HASHTAG_MAX_LENGTH} символов, включая #`,
  NO_SPACES: 'Хэш-теги должны разделяться пробелами',
  NO_REPEAT: 'Хэш-тег не может быть использован дважды',
  HASHTAG_MAX_NUMBER: `Нельзя указать больше ${HASHTAG_MAX_NUMBER} хэш-тегов`,
  COMMENT_MAX_LENGTH: `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов`
};

let errorMessage = '';

const getUniqueHashtags = (hashtags) => {
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const hashtagsHandler = (string) => {
  errorMessage = '';

  const inputText = string.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  if(inputHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtags.some((item) => item[0] !== '#'),
      error: errorMessageType.START_WITH,
    },

    {
      check: inputHashtags.some((item) => item.length === 1),
      error: errorMessageType.ONLY_ONE_GRID,
    },

    {
      check: inputHashtags.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9#]{1,500}$/.test(item)),
      error: errorMessageType.UNACCEPTABLE_SYMBOLS,
    },

    {
      check: inputHashtags.some((item) => item.length > HASHTAG_MAX_LENGTH),
      error: errorMessageType.HASHTAG_MAX_LENGTH,
    },

    {
      check: inputHashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: errorMessageType.NO_SPACES,
    },

    {
      check: !getUniqueHashtags(inputHashtags),
      error: errorMessageType.NO_REPEAT,
    },

    {
      check: inputHashtags.length > HASHTAG_MAX_NUMBER,
      error: errorMessageType.HASHTAG_MAX_NUMBER,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const commentHandler = (string) => {
  errorMessage = '';

  const inputText = string.trim();

  if(!inputText) {
    return true;
  }

  const rule = {
    check: !checkStringLength(inputText, COMMENT_MAX_LENGTH),
    error: errorMessageType.COMMENT_MAX_LENGTH,
  };

  const isInvalid = rule.check;

  if(isInvalid) {
    errorMessage = rule.error;
  }
  return !isInvalid;
};

export {errorMessage, hashtagsHandler, commentHandler};

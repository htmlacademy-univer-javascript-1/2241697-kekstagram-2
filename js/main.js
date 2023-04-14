const DESCRIPTIONS = [
  'Sunset on the beach',
  'Lake in mountains',
  'Me and my cat',
  'I like food=)',
  'Take me to church',
  'Easter eggs',
];

const NAMES = [
  'Иван',
  'Игорь',
  'Мария',
  'Степан',
  'Алёна',
  'Елена',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const OBJECT_COUNT = 25;

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

const createComment = () => ({
  commentId: getCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createDescription = () => ({
  id: getId(),
  url: `photos/${getPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: 6}, createComment),
});

const photoDescriptions = Array.from({length: OBJECT_COUNT}, createDescription);

console.log(photoDescriptions);

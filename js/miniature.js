import {createPhotos} from './data.js';

const photosContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPhotos = createPhotos();

const photosContainerFragment = document.createDocumentFragment();

userPhotos.forEach(({url, description, likes, comments}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__info').textContent = description;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments;
  photosContainerFragment.appendChild(miniatureElement);
});

photosContainer.appendChild(photosContainerFragment);

export{photosContainer};

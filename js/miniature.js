import {openBigPhoto} from './big-photo.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const photoContainerFragment = document.createDocumentFragment();

let photos = [];

const showPhoto = (pictures) => {
  photos = pictures;
  pictures.forEach(({url, comments, likes}, index) => {
    const miniatureElement = photoTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').setAttribute('photo-index', index);
    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    photoContainerFragment.appendChild(miniatureElement);
  });
  photosContainer.appendChild(photoContainerFragment);
};

const hidePhotos = () => {
  photosContainer.querySelectorAll('.picture').forEach((miniatureElement) => {
    miniatureElement.remove();
  });
};

const onPhotoClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    evt.preventDefault();
    openBigPhoto(photos[evt.target.getAttribute('photo-index')]);
  }
};

photosContainer.addEventListener('click', onPhotoClick);

export {showPhoto, hidePhotos};

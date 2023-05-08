import {isEscapeKey} from './utils.js';

const bigPhoto = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeBigPhoto();
};

const openBigPhoto = (photo) => {
  const pictureElement = bigPhoto.querySelector('.big-picture__img').lastElementChild;

  pictureElement.src = photo.url;
  pictureElement.setAttribute('alt', 'Фото пользователя');
  bigPhoto.querySelector('.social__caption').textContent =  photo.description;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);

  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closeBigPhoto () {
  document.body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

export {openBigPhoto, closeBigPhoto};

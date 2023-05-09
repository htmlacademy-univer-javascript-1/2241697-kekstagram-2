import {isEscapeKey} from './utils.js';

const DEFAULT_RENDERED_COMMENTS = 5;
const STEP_ADDED_COMMENTS = 5;

const bigPhoto = document.querySelector('.big-picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const commentsList = bigPhoto.querySelector('.social__comments');
const commentsCounter = bigPhoto.querySelector('.social__comment-count');
const commentsLoadButton = bigPhoto.querySelector('.comments-loader');

let allComments = [];
let numberOfComments = DEFAULT_RENDERED_COMMENTS;

const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
</li>`;

const getCommentsCounterTemplate = (commentsNumber) => `${Math.min(numberOfComments, commentsNumber)} из <span class="comments-count">${commentsNumber}</span> комментариев`;

const getCommentsCounter = () => {
  commentsCounter.innerHTML = '';
  commentsCounter.insertAdjacentHTML('afterbegin', getCommentsCounterTemplate(allComments.length));
};

const renderComments = () => {
  getCommentsCounter();

  commentsList.innerHTML = '';
  const commentsTemplate = allComments.slice(0, numberOfComments).map((comment) => getCommentTemplate(comment)).join('');
  commentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (numberOfComments >= allComments.length) {
    commentsLoadButton.removeEventListener('click', onLoadButtonClick);
    commentsLoadButton.classList.add('hidden');
  }
};

const loadComments = ({comments}) => {
  allComments = comments.slice();
  commentsList.innerHTML = '';

  if (comments.length === 0) {
    commentsLoadButton.classList.add('hidden');
    commentsCounter.textContent = 'Нет комментариев';
    return;
  }

  renderComments();
  commentsLoadButton.addEventListener('click', onLoadButtonClick);
};

function onLoadButtonClick() {
  numberOfComments += STEP_ADDED_COMMENTS;
  renderComments();
}

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
  bigPhoto.querySelector('img').setAttribute('src', photo.url);
  bigPhoto.querySelector('img').setAttribute('alt', 'Фото пользователя');
  bigPhoto.querySelector('.social__caption').textContent =  photo.description;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;

  document.body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onBigPhotoEscKeydown);
  loadComments(photo);
};

function closeBigPhoto () {
  document.body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  commentsLoadButton.classList.remove('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  commentsLoadButton.removeEventListener('click', onLoadButtonClick);

  numberOfComments = DEFAULT_RENDERED_COMMENTS;
}

export {openBigPhoto};

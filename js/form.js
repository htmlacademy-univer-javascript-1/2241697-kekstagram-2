import {isEscapeKey} from './utils.js';
import {errorMessage, hashtagsHandler, commentHandler} from './errors.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imgUploadField = document.querySelector('#upload-file');
const editImg = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const error = () => errorMessage;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeUploadPopup  = () => {
  editImg.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const onCloseButtonClick = () => {
  closeUploadPopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const addFieldListeners = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

const publishButton = () => {
  submitButton.disabled = !pristine.validate();
};

const onImgUploadFieldchange = () => {
  editImg.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown',onPopupEscKeydown);
  addFieldListeners(commentsField);
  addFieldListeners(hashtagsField);
  publishButton();
};

const validateForm = () => {
  pristine.addValidator(hashtagsField, hashtagsHandler, error);
  pristine.addValidator(commentsField, commentHandler, error);
  publishButton();
};

const onHashtagInput = () => publishButton();
const onCommentInput = () => publishButton();

const renderUploadForm = () => {
  imgUploadField.addEventListener('change', onImgUploadFieldchange);
  hashtagsField.addEventListener('input', onHashtagInput);
  commentsField.addEventListener('input', onCommentInput);
  validateForm();
};

export {renderUploadForm};

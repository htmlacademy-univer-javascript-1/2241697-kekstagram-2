import {isEscapeKey} from './utils.js';
import {errorMessage, hashtagsHandler, commentHandler} from './errors.js';
import {createScaleContainer, removeScaleContainer} from './photo-scale.js';
import {createSlider, applyEffects, removeEffects} from './photo-effects.js';
import {outputData} from './api.js';
import {renderMessage} from './load-message.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const imgUploadField = document.querySelector('#upload-file');
const editImg = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');

const sliderWrapper = document.querySelector('.effect-level');

const error = () => errorMessage;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeUploadPopup  = () => {
  editImg.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);

  removeScaleContainer();
  removeEffects();
  imgUploadField.value = '';
};

const closeUploadPopupDefault  = () => {
  closeUploadPopup();
  photoPreview.removeAttribute('class');
  photoPreview.removeAttribute('style');
  form.reset();
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopupDefault();
  }
}

function onCloseButtonClick () {
  closeUploadPopupDefault();
}

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

const checkForHidden = () => photoPreview.hasAttribute('class') ? sliderWrapper.classList.remove('hidden') : sliderWrapper.classList.add('hidden');

const onImgUploadFieldchange = () => {
  editImg.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);

  applyEffects();
  createScaleContainer();
  addFieldListeners(commentsField);
  addFieldListeners(hashtagsField);
  checkForHidden();
  publishButton();
};

const validateForm = () => {
  pristine.addValidator(hashtagsField, hashtagsHandler, error);
  pristine.addValidator(commentsField, commentHandler, error);
  publishButton();
};

const onHashtagInput = () => publishButton();
const onCommentInput = () => publishButton();

const setFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      submitButton.disabled = true;
      outputData(() => {
        onSuccess();
        renderMessage(true);
      },
      () => {
        onError();
        renderMessage();
      },
      new FormData(evt.target),
      );
    }
  });
};

const renderUploadForm = () => {
  imgUploadField.addEventListener('change', onImgUploadFieldchange);
  hashtagsField.addEventListener('input', onHashtagInput);
  commentsField.addEventListener('input', onCommentInput);

  createSlider();
  validateForm();
  setFormSubmit(closeUploadPopupDefault, closeUploadPopup);
};

export {renderUploadForm};

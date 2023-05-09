import {isEscapeKey} from './utils.js';
import {errorMessage, hashtagsHandler, commentHandler} from './errors.js';
import {onScaleButtonClick} from './photo-scale.js';
import {applyEffects, onFilterButtonChange} from './photo-effects.js';
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
const scaleContainer = document.querySelector('.img-upload__scale');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');
const onEffectListChange = document.querySelector('.effects__list');
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
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  onEffectListChange.removeEventListener('change', onFilterButtonChange);
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
  scaleContainer.addEventListener('click', onScaleButtonClick);
  onEffectListChange.addEventListener('change', onFilterButtonChange);

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
  });
};

const renderUploadForm = () => {
  imgUploadField.addEventListener('change', onImgUploadFieldchange);
  hashtagsField.addEventListener('input', onHashtagInput);
  commentsField.addEventListener('input', onCommentInput);

  applyEffects();
  validateForm();
  setFormSubmit(closeUploadPopupDefault, closeUploadPopup);
};

export {renderUploadForm};

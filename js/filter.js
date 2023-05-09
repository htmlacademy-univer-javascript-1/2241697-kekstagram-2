import {debounce, mixArray} from './utils.js';
import {showPhoto, hidePhoto} from './miniature.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

const MAX_RANDOM_PHOTO = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let photos = [];

const getFilteredPhotos = (filterName) => {
  let filteredPhotos = [];

  switch (filterName) {
    case Filter.RANDOM:
      filteredPhotos = mixArray(photos).slice(0, MAX_RANDOM_PHOTO);
      break;
    case Filter.DISCUSSED:
      filteredPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPhotos = photos.slice();
  }
  return filteredPhotos;
};

const onFilterClick = (evt) => {
  const filterName = evt.target.id;
  hidePhoto();
  showPhoto(getFilteredPhotos(filterName));
  filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const showFilters = (data) => {
  photos = data.slice();
  showPhoto(photos);
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce(onFilterClick));
};

export {showFilters};

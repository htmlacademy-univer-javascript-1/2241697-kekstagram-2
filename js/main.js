import {indicateError} from './errors.js';
import {renderUploadForm} from './form.js';
import {inputData} from './api.js';
import {showFilters} from './filter.js';
import './load-photo.js';


inputData((photos) => showFilters(photos),
  () => indicateError);

renderUploadForm();

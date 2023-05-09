import {indicateError} from './errors.js';
import {showPhoto} from './miniature.js';
import {renderUploadForm} from './form.js';
/*import {applyEffects} from './photo-effects.js';*/
import {inputData} from './api.js';


inputData((photos) => showPhoto(photos),
  () => indicateError);

renderUploadForm();

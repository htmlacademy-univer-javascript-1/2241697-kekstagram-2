import {createPhotos} from './data.js';
import {showPhoto} from './miniature.js';
import {renderUploadForm} from './form.js';
import {applyEffects} from './photo-effects.js';


const photo = createPhotos();

showPhoto(photo);
renderUploadForm(photo);
applyEffects(photo);

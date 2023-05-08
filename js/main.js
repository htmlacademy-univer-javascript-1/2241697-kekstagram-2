import {createPhotos} from './data.js';
import {showPhoto} from './miniature.js';
import {renderUploadForm} from './form.js';

const photo = createPhotos();

showPhoto(photo);
renderUploadForm(photo);

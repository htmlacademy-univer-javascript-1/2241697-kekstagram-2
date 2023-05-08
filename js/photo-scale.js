const scaleValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');

const PercentageScale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const onScaleButtonClick = (evt) => {
  let scale = PercentageScale.MAX;
  const scaleInput = Number.parseInt(scaleValue.value, 10);
  const buttonScale = evt.target;

  if (buttonScale.tagName !== 'BUTTON') {
    return;
  }

  if (buttonScale.classList.contains('scale__control--bigger')) {
    scale = Math.min(scaleInput + PercentageScale.STEP, PercentageScale.MAX);
    scaleValue.value = `${scale}%`;
  } else {
    scale = Math.max(scaleInput - PercentageScale.STEP, PercentageScale.MIN);
    scaleValue.value = `${scale}%`;
  }

  photoPreview.style.transform = `scale(${scale/100})`;
};

export {onScaleButtonClick};

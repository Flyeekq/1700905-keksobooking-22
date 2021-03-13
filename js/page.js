const adForm = document.querySelector('.ad-form');
// const adFormChildren = adForm.children;

export const setPageActivity = (status) => {
  if (!status) {
    adForm.classList.add('ad-form--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
  }
};

const onKeydownEsc = (callback) => (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    evt.preventDefault();

    document.body.classList.remove('hide-overflow');
    callback();
  }
};

const onClickCloseBtn = (callback) => (evt) => {
  if (evt.target.classList.contains('film-details__close-btn')) {
    evt.preventDefault();

    document.body.classList.remove('hide-overflow');
    callback();
  }
};

export {
  onKeydownEsc,
  onClickCloseBtn
};

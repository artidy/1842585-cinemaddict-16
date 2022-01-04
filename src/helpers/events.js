const onKeydownEsc = (popup) => (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    evt.preventDefault();

    popup.removeEvent('onKeydownEsc', 'keydown', document);
    document.body.classList.remove('hide-overflow');
    popup.removeElement();
  }
};

const onClickCloseBtn = (popup) => (evt) => {
  evt.preventDefault();

  if (evt.target.classList.contains('film-details__close-btn')) {
    popup.removeEvent('onKeydownEsc', 'keydown', document);
    document.body.classList.remove('hide-overflow');
    popup.removeElement();
  }
};

export {
  onKeydownEsc,
  onClickCloseBtn,
};

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export {RenderPosition, render};

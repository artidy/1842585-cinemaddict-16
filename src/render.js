const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch(position) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RenderPosition, render, createElement};

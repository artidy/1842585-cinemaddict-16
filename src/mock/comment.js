import {getRandomDescription, getRandomDate, getRandomEmotion, getRandomAuthor} from './helpers';

const generateComment = (id) => ({
  id,
  text: getRandomDescription(),
  emotion: getRandomEmotion(),
  author: getRandomAuthor(),
  date: getRandomDate()
});

export {generateComment};

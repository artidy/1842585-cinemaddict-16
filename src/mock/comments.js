import {generateComment} from './comment';

const generateComments = (films) => films.map((film) => film.comments.map((commentId) => generateComment(commentId))).flat();

export {generateComments};

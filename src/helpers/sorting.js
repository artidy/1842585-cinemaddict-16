const sortMoviesByRating = (movies) => movies.slice().sort(({rating: firstRating}, {rating: secondRating}) => firstRating < secondRating);
const sortMoviesByComments = (movies) => movies.slice().sort(({comments: firstComments}, {comments: secondComments}) => firstComments.length < secondComments.length);
const sortMoviesByDate = (movies) => movies.slice().sort(({releaseDate: firstDate}, {releaseDate: secondDate}) => firstDate < secondDate);

export {
  sortMoviesByRating,
  sortMoviesByComments,
  sortMoviesByDate,
};

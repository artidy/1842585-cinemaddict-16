const sortMoviesByRating = (movies) => movies.sort(({rating: firstRating}, {rating: secondRating}) => secondRating - firstRating);
const sortMoviesByComments = (movies) => movies.sort(({comments: firstComments}, {comments: secondComments}) => secondComments.length - firstComments.length);
const sortMoviesByDate = (movies) => movies.sort(({releaseDate: firstDate}, {releaseDate: secondDate}) => secondDate - firstDate);

export {
  sortMoviesByRating,
  sortMoviesByComments,
  sortMoviesByDate,
};

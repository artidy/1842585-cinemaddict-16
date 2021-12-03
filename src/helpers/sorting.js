const sortTopRatedMovies = (movies) => movies.slice().sort(({rating: firstRating}, {rating: secondRating}) => firstRating < secondRating);
const sortMostCommentedMovies = (movies) => movies.slice().sort(({comments: firstComments}, {comments: secondComments}) => firstComments.length < secondComments.length);

export {
  sortTopRatedMovies,
  sortMostCommentedMovies,
};

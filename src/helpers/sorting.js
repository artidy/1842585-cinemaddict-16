import dayjs from 'dayjs';

const sortMoviesByRating = (movies) => movies.sort(({rating: firstRating}, {rating: secondRating}) => secondRating - firstRating);
const sortMoviesByComments = (movies) => movies.sort(({comments: firstComments}, {comments: secondComments}) => secondComments.length - firstComments.length);
const sortMoviesByDate = (movies) => movies.sort(({releaseDate: firstDate}, {releaseDate: secondDate}) => dayjs(secondDate).diff(dayjs(firstDate)));
const sortChartGenres = (chartData) => {
  const genres = Object.keys(chartData);

  return genres.sort((firstGenre, secondGenre) => chartData[secondGenre] - firstGenre[secondGenre]);
};
const sortChartValues = (chartData) => {
  const values = Object.values(chartData);

  return values.sort((firstValue, secondValue) => secondValue - firstValue);
};

export {
  sortMoviesByRating,
  sortMoviesByComments,
  sortMoviesByDate,
  sortChartGenres,
  sortChartValues
};

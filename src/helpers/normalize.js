const normalizeMovie = (
  {
    id,
    comments,
    film_info: {
      title,
      alternative_title: originalTitle,
      total_rating: rating,
      poster,
      age_rating: maturityRating,
      director,
      writers: screenWriters,
      actors,
      release: {
        date: releaseDate,
        release_country: country,
      },
      runtime,
      genre: genres,
      description,
    },
    user_details: {
      watchlist: isInWatchlist,
      already_watched: isWatched,
      watching_date: watchingDate,
      favorite: isFavorite,
    }}) => ({
  id,
  poster,
  title,
  originalTitle,
  rating,
  director,
  screenWriters,
  actors,
  releaseDate,
  runtime,
  country,
  genres,
  description,
  maturityRating,
  comments,
  isInWatchlist,
  isWatched,
  isFavorite,
  watchingDate,
});
const normalizeMovieServer = (
  {
    id,
    poster,
    title,
    originalTitle,
    rating,
    director,
    screenWriters,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description,
    maturityRating,
    comments,
    isInWatchlist,
    isWatched,
    isFavorite,
    watchingDate,
  }) => ({
  id,
  comments,
  'film_info': {
    title,
    'alternative_title': originalTitle,
    'total_rating': rating,
    poster,
    'age_rating': maturityRating,
    director,
    writers: screenWriters,
    actors,
    release: {
      'date': releaseDate,
      'release_country': country,
    },
    runtime,
    genre: genres,
    description,
  },
  'user_details': {
    watchlist: isInWatchlist,
    'already_watched': isWatched,
    'watching_date': watchingDate,
    favorite: isFavorite,
  },
});
const normalizeComment = ({id, comment, emotion, author, date}) => ({
  id,
  text: comment,
  emotion,
  author,
  date,
});
const normalizeCommentServer = ({text, emotion}) => ({
  comment: text,
  emotion,
});
const normalizeUser = ({avatar, rating}) => ({
  avatar,
  rating,
});

export {
  normalizeMovie,
  normalizeMovieServer,
  normalizeComment,
  normalizeCommentServer,
  normalizeUser,
};

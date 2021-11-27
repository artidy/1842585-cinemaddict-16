const normalizeFilm = ({poster, title, originalTitle, rating, director, screenWriters, actors, releaseDate, duration, country, genres, description, maturityRating, comments}) => ({
  poster: poster,
  title: title,
  originalTitle: originalTitle,
  rating: rating,
  director: director,
  screenWriters: screenWriters,
  actors: actors,
  releaseDate: releaseDate,
  duration: duration,
  country: country,
  genres: genres,
  description: description,
  maturityRating: maturityRating,
  comments: comments,
});

const normalizeArray = (list, callback) => list.map((value) => callback(value));

export {
  normalizeArray,
  normalizeFilm,
};

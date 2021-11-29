import _ from 'lodash';

import {
  getRandomTitle,
  getRandomPoster,
  getRandomDescription,
  getRandomRating,
  getRandomDirectors,
  getRandomScreenWriters,
  getRandomActors,
  getRandomDate,
  getRandomDuration,
  getRandomCountry,
  getRandomGenres,
  getRandomMaturityRating,
  getRandomComments,
  getRandomBoolean,
} from './helpers';

const generateFilmCard = () => {
  const title = getRandomTitle();

  return {
    id: _.uniqueId(),
    poster: getRandomPoster(),
    title,
    originalTitle: title,
    rating: getRandomRating(),
    director: getRandomDirectors(),
    screenWriters: getRandomScreenWriters(),
    actors: getRandomActors(),
    releaseDate: getRandomDate(),
    duration: getRandomDuration(),
    country: getRandomCountry(),
    genres: getRandomGenres(),
    description: getRandomDescription(),
    maturityRating: getRandomMaturityRating(),
    comments: getRandomComments(),
    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };

};

export {generateFilmCard};

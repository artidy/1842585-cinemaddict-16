import {
  getRandomTitle,
  getRandomPoster,
  getRandomDescription,
  getRandomRating,
  getRandomDirectors,
  getRandomScreenWriters,
  getRandomActors,
  getRandomFormatDate,
  getRandomDuration,
  getRandomCountry,
  getRandomGenres,
  getRandomMaturityRating,
} from './helpers';
import {DEFAULT_DATE_FORMAT} from './constants';

const generateFilmCard = () => {
  const title = getRandomTitle();

  return {
    poster: getRandomPoster(),
    title,
    originalTitle: title,
    rating: getRandomRating(),
    director: getRandomDirectors(),
    screenWriters: getRandomScreenWriters(),
    actors: getRandomActors(),
    releaseDate: getRandomFormatDate(DEFAULT_DATE_FORMAT),
    duration: getRandomDuration(),
    country: getRandomCountry(),
    genres: getRandomGenres(),
    description: getRandomDescription(),
    maturityRating: getRandomMaturityRating(),
  };

};

export {generateFilmCard};

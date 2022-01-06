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
    comments: getRandomComments(),
    'film_info': {
      title,
      'alternative_title': title,
      'total_rating': getRandomRating(),
      poster: getRandomPoster(),
      'age_rating': getRandomMaturityRating(),
      director: getRandomDirectors(),
      writers: getRandomScreenWriters(),
      actors: getRandomActors(),
      release: {
        date: getRandomDate(),
        'release_country': getRandomCountry(),
      },
      runtime: getRandomDuration(),
      genre: getRandomGenres(),
      description: getRandomDescription(),
    },
    'user_details': {
      'watchlist': getRandomBoolean(),
      'already_watched': getRandomBoolean(),
      'watching_date': getRandomDate(),
      'favorite': getRandomBoolean(),
    },
  };

};

export {generateFilmCard};

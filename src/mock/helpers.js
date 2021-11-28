import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import _ from 'lodash';

dayjs.extend(dayjsRandom);

import {
  DEFAULT_MIN_NUMBER,
  DEFAULT_MAX_NUMBER,
  FILMS_TITLES,
  FILMS_POSTERS,
  FILMS_DESCRIPTIONS,
  MIN_RATING_NUMBER,
  MAX_RATING_NUMBER,
  RATING_DECIMAL,
  FILMS_DIRECTORS,
  FILMS_SCREEN_WRITERS,
  FILMS_ACTORS,
  MAX_GAP_YEAR,
  MAX_GAP_HOUR,
  MAX_GAP_MINUTES,
  FILMS_COUNTRIES,
  FILMS_GENRES,
  MAX_MATURITY_RATING_NUMBER, DEFAULT_FILMS_COUNT, COMMENTS_EMOTION, COMMENTS_AUTHORS,
} from './constants';

const getRandomValueFromArray = (list) => list[_.random(DEFAULT_MIN_NUMBER, list.length - DEFAULT_MAX_NUMBER)];

const getRandomValuesFromArray = (list) => [...new Set(Array.from({length: _.random(DEFAULT_MAX_NUMBER, list.length)}, () => getRandomValueFromArray(list)))];

const getRandomTitle = () => getRandomValueFromArray(FILMS_TITLES);

const getRandomPoster = () => getRandomValueFromArray(FILMS_POSTERS);

const getRandomDescription = () => getRandomValueFromArray(FILMS_DESCRIPTIONS);

const getRandomRating = () => _.random(MIN_RATING_NUMBER, MAX_RATING_NUMBER, true).toFixed(RATING_DECIMAL);

const getRandomDirectors = () => getRandomValueFromArray(FILMS_DIRECTORS);

const getRandomScreenWriters = () => getRandomValuesFromArray(FILMS_SCREEN_WRITERS);

const getRandomActors = () => getRandomValuesFromArray(FILMS_ACTORS);

const getRandomCountry = () => getRandomValueFromArray(FILMS_COUNTRIES);

const getRandomGenres = () => getRandomValuesFromArray(FILMS_GENRES);

const getRandomDate = () => dayjs.between(dayjs().add(-_.random(DEFAULT_MIN_NUMBER, MAX_GAP_YEAR), 'year'),
  dayjs().add(-_.random(DEFAULT_MIN_NUMBER, MAX_GAP_YEAR), 'year')).toDate();

const getRandomDuration = () => `${_.random(DEFAULT_MAX_NUMBER, MAX_GAP_HOUR)}h ${_.random(DEFAULT_MAX_NUMBER, MAX_GAP_MINUTES)}m`;

const getRandomMaturityRating = () => `${_.random(DEFAULT_MIN_NUMBER, MAX_MATURITY_RATING_NUMBER)}+`;

const getRandomComments = () => Array.from({length: _.random(DEFAULT_MIN_NUMBER, DEFAULT_FILMS_COUNT)}, _.uniqueId);

const getRandomEmotion = () => getRandomValueFromArray(COMMENTS_EMOTION);

const getRandomAuthor = () => getRandomValueFromArray(COMMENTS_AUTHORS);

const getRandomBoolean = () => Boolean(_.random(DEFAULT_MIN_NUMBER, DEFAULT_MAX_NUMBER));

export {
  getRandomTitle,
  getRandomPoster,
  getRandomDescription,
  getRandomRating,
  getRandomDirectors,
  getRandomScreenWriters,
  getRandomActors,
  getRandomCountry,
  getRandomGenres,
  getRandomDate,
  getRandomDuration,
  getRandomMaturityRating,
  getRandomComments,
  getRandomEmotion,
  getRandomAuthor,
  getRandomBoolean,
};

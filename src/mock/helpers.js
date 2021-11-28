import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import _ from 'lodash';

dayjs.extend(dayjsRandom);

import {
  DEFAULT_MIN_NUMBER,
  DEFAULT_MAX_NUMBER,
  DEFAULT_DECIMAL,
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

const getRandomNumber = (start = DEFAULT_MIN_NUMBER, end = DEFAULT_MAX_NUMBER, decimal = DEFAULT_DECIMAL) => (Math.random() * (Math.max(start, end) - Math.min(start, end))).toFixed(decimal);

const getRandomValueFromArray = (list) => list[getRandomNumber(DEFAULT_MIN_NUMBER, list.length - DEFAULT_MAX_NUMBER)];

const getRandomValuesFromArray = (list) => [...new Set(Array.from({length: getRandomNumber(DEFAULT_MAX_NUMBER, list.length)}, () => getRandomValueFromArray(list)))];

const getRandomTitle = () => getRandomValueFromArray(FILMS_TITLES);

const getRandomPoster = () => getRandomValueFromArray(FILMS_POSTERS);

const getRandomDescription = () => getRandomValueFromArray(FILMS_DESCRIPTIONS);

const getRandomRating = () => getRandomNumber(MIN_RATING_NUMBER, MAX_RATING_NUMBER, RATING_DECIMAL);

const getRandomDirectors = () => getRandomValueFromArray(FILMS_DIRECTORS);

const getRandomScreenWriters = () => getRandomValuesFromArray(FILMS_SCREEN_WRITERS);

const getRandomActors = () => getRandomValuesFromArray(FILMS_ACTORS);

const getRandomCountry = () => getRandomValueFromArray(FILMS_COUNTRIES);

const getRandomGenres = () => getRandomValuesFromArray(FILMS_GENRES);

const getRandomDate = () => dayjs.between(dayjs().add(-getRandomNumber(DEFAULT_MIN_NUMBER, MAX_GAP_YEAR), 'year'),
  dayjs().add(-getRandomNumber(DEFAULT_MIN_NUMBER, MAX_GAP_YEAR), 'year')).toDate();

const getRandomDuration = () => `${getRandomNumber(DEFAULT_MAX_NUMBER, MAX_GAP_HOUR)}h ${getRandomNumber(DEFAULT_MAX_NUMBER, MAX_GAP_MINUTES)}m`;

const getRandomMaturityRating = () => `${getRandomNumber(DEFAULT_MIN_NUMBER, MAX_MATURITY_RATING_NUMBER)}+`;

const getRandomComments = () => Array.from({length: getRandomNumber(DEFAULT_MIN_NUMBER, DEFAULT_FILMS_COUNT)}, _.uniqueId);

const getRandomEmotion = () => getRandomValueFromArray(COMMENTS_EMOTION);

const getRandomAuthor = () => getRandomValueFromArray(COMMENTS_AUTHORS);

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
};

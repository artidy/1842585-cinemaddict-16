import dayjs from 'dayjs';
import {MINUTES_IN_HOUR} from '../constants';

const normalizeArray = (list, callback) => list.map((value) => callback(value));
const formatDate = (date, format) => dayjs(date).format(format);
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(number);
const getDurationHours = (duration) => Math.floor(duration / MINUTES_IN_HOUR);
const getDurationMinutes = (duration) => duration % MINUTES_IN_HOUR;
const formatRuntime = (runtime) => `${getDurationHours(runtime)}h ${getDurationMinutes(runtime)}m`;
const getStatsInfo = (movies) => {
  const stats = {};

  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < movies[i].genres.length; j++) {
      if (stats[movies[i].genres[j]]) {
        stats[movies[i].genres[j]] += 1;
        continue;
      }

      stats[movies[i].genres[j]] = 1;
    }
  }

  return stats;
};
const getDuration = (movies) => movies.reduce(((prevValue, {runtime}) => prevValue + runtime), 0);

export {
  normalizeArray,
  formatDate,
  formatNumber,
  formatRuntime,
  getStatsInfo,
  getDuration,
  getDurationHours,
  getDurationMinutes,
};

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(relativeTime);
dayjs.extend(duration);

const normalizeArray = (values, callback) => values.map(callback);
const formatDate = (date, format) => dayjs(date).format(format);
const getDateAgo = (date) => dayjs(date).fromNow();
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(number);
const getDurationHours = (runtime) => Math.floor(dayjs.duration(runtime, 'minute').asHours());
const getDurationMinutes = (runtime) => dayjs.duration(runtime, 'minute').minutes();
const formatRuntime = (runtime) => `${getDurationHours(runtime)}h ${getDurationMinutes(runtime)}m`;
const getStatsInfo = (movies) => {
  const stats = {};

  for (const movie of movies) {
    for (const genre of movie.genres) {
      if (stats[genre]) {
        stats[genre] += 1;
        continue;
      }

      stats[genre] = 1;
    }
  }

  return stats;
};
const getDuration = (movies) => movies.reduce(((prevValue, {runtime}) => prevValue + runtime), 0);
const getAuthorization = () => 'Basic GlshdG!jd4283@Hw32';

export {
  normalizeArray,
  formatDate,
  formatNumber,
  formatRuntime,
  getStatsInfo,
  getDuration,
  getDurationHours,
  getDurationMinutes,
  getAuthorization,
  getDateAgo
};

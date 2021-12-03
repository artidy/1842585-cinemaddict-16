import dayjs from 'dayjs';

const normalizeArray = (list, callback) => list.map((value) => callback(value));
const formatDate = (date, format) => dayjs(date).format(format);
const formatNumber = (number) => new Intl.NumberFormat('ru-RU').format(number);

export {
  normalizeArray,
  formatDate,
  formatNumber,
};

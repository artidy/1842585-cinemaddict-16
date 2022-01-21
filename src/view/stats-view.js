import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import AbstractSmartView from './abstract-smart-view';
import {BAR_HEIGHT, FilterState, USER_AVATAR, Rating} from '../constants';
import {getDuration, getDurationHours, getDurationMinutes, getStatsInfo} from '../helpers/common';
import {sortChartGenres, sortChartValues} from '../helpers/sorting';
import {filterStats} from '../helpers/filters';

const getRatingTemplate = (avatar, rating) => rating ?
  `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="${avatar}" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rating}</span>
    </p>` : '';

const getStatisticsTemplate = (currentFilter, watched, duration, topGenre, avatar, rating) =>
  `<section class="statistic">

    ${getRatingTemplate(avatar, rating)}

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all" ${currentFilter === 'all' ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentFilter === 'today' ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentFilter === 'week' ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentFilter === 'month' ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentFilter === 'year' ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getDurationHours(duration)} <span class="statistic__item-description">h</span> ${getDurationMinutes(duration)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;

class StatsView extends AbstractSmartView {
  #movies = [];
  #watched = 0;
  #duration = 0;
  #topGenre = '';
  #labels = [];
  #labelsValue = [];
  #currentFilter = FilterState.All;
  #avatar = USER_AVATAR;
  #rating = Rating.NONE;

  constructor(movies, rating) {
    super();

    this.#movies = movies;
    this.#rating = rating;
  }

  get template() {
    return getStatisticsTemplate(this.#currentFilter, this.#watched, this.#duration, this.#topGenre, this.#avatar, this.#rating);
  }

  updateElement = () => {
    const movies = filterStats(this.#movies, this.#currentFilter);
    this.#watched = movies.length;
    this.#duration = getDuration(movies);
    const chartData = getStatsInfo(movies);
    this.#labels = sortChartGenres(chartData);
    this.#topGenre = movies.length > 0 ? this.#labels[0] : '';
    this.#labelsValue = sortChartValues(chartData);

    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers();
    this.#updateChart();
  }

  restoreHandlers = () => {
    this.addEvent('onClickStatMenu', 'click', this.#onClickStatMenu);
  }

  #updateChart = () => {
    const statisticCtx = document.querySelector('.statistic__chart');
    statisticCtx.height = BAR_HEIGHT * this.#labels.length;

    new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: this.#labels,
        datasets: [{
          data: this.#labelsValue,
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
          barThickness: 24,
        }],
      },
      options: {
        responsive: false,
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: '#ffffff',
            anchor: 'start',
            align: 'start',
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#ffffff',
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  #onClickStatMenu = (evt) => {
    evt.preventDefault();
    const filter = this.element.querySelector(`#${evt.target.getAttribute('for')}`);

    if (filter && filter.value !== this.#currentFilter) {
      this.#currentFilter = filter.value;
      this.updateElement();
    }
  }
}

export default StatsView;

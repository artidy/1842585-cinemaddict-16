import {Methods, Urls} from './constants';
import {normalizeCommentServer, normalizeMovieServer} from './helpers/normalize';

class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor (endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get movies() {
    return this.#load({url: Urls.MOVIES});
  }

  getMoviesComments = (movieId) => this.#load({url: `${Urls.COMMENTS}/${movieId}`})

  updateMovie = (movie) => this.#load({
    url: `${Urls.MOVIES}/${movie.id}`,
    method: Methods.PUT,
    body: JSON.stringify(normalizeMovieServer(movie)),
  });

  addComment = (movieId, comment) => this.#load({
    url: `${Urls.COMMENTS}/${movieId}`,
    method: Methods.POST,
    body: JSON.stringify(normalizeCommentServer(comment)),
  });

  deleteComment = (commentId) => this.#load({
    url: `${Urls.COMMENTS}/${commentId}`,
    method: Methods.DELETE,
  });

  #load = async ({
    url,
    method = Methods.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(`${this.#endPoint}/${url}`, {method, body, headers});

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

export default ApiService;

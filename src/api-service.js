import {Method, Url} from './constants';
import {normalizeCommentServer, normalizeMovieServer} from './helpers/normalize';

class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor (endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get movies() {
    return this.#load({url: Url.MOVIES});
  }

  getMoviesComments = (movieId) => this.#load({url: `${Url.COMMENTS}/${movieId}`})

  updateMovie = (movie) => this.#load({
    url: `${Url.MOVIES}/${movie.id}`,
    method: Method.PUT,
    body: JSON.stringify(normalizeMovieServer(movie)),
    headers: new Headers({'Content-Type': 'application/json'}),
  });

  addComment = (movieId, comment) => this.#load({
    url: `${Url.COMMENTS}/${movieId}`,
    method: Method.POST,
    body: JSON.stringify(normalizeCommentServer(comment)),
    headers: new Headers({'Content-Type': 'application/json'}),
  });

  deleteComment = (commentId) => this.#load({
    url: `${Url.COMMENTS}/${commentId}`,
    method: Method.DELETE,
  });

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    try {
      const response = await fetch(`${this.#endPoint}/${url}`, {method, body, headers});

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

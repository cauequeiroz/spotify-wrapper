import search from './search';

export default class SpotifyWrapper {
  constructor({ apiURL, token }) {
    this.apiURL = apiURL || 'https://api.spotify.com/v1/';
    this.token = token;

    this.search = search.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return fetch(url, headers).then(data => data.json());
  }
}

// import {
//   search,
//   searchAlbums,
//   searchArtists,
//   searchPlaylists,
//   searchTracks,
// } from './search';

// import {
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
// } from './album';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || 'https://api.spotify.com/v1/';
    this.token = options.token;
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    fetch(url, headers);
  }
}

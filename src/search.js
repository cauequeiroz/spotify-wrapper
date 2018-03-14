function searcher(type, query) {
  return this.request(`${this.apiURL}search?q=${query}&type=${type}`);
}

export default function search() {
  return {
    albums: searcher.bind(this, 'album'),
    artists: searcher.bind(this, 'artist'),
    tracks: searcher.bind(this, 'track'),
    playlists: searcher.bind(this, 'playlist'),
  };
}

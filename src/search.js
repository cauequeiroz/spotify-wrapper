import TOKEN from './config';

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    .then(data => data.json());

export const searchAlbums = query => search(query, 'album');
export const searchArtists = query => search(query, 'artist');
export const searchTracks = query => search(query, 'track');
export const searchPlaylists = query => search(query, 'playlist');
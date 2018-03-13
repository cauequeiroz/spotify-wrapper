const HEADERS = {
  headers: {
    Authorization: 'Bearer BQBBSczkOlne0vHH5CjMWtZMpa0GwWk_lOD0vRv4ONFBsrxGOsVHP3uCJT9AvSvlAgmkBUeIeOrSpWIXR4GvqJzE-PrCCcJsPg-F9AWdLiGtb4awFvmV-klUK8jHMyFEt1N3QbZ0DBe8PB8sTU4',
  },
};

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, HEADERS)
    .then(data => data.json());

export const searchAlbums = query => search(query, 'album');
export const searchArtists = query => search(query, 'artist');
export const searchTracks = query => search(query, 'track');
export const searchPlaylists = query => search(query, 'playlist');

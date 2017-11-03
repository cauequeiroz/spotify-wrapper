const TOKEN_API = 'BQCp8U4m3wZl6kPq7NFm79zD9cAMRKSlJAd8axzk4Ti_k92ZzACoMI-XISyoJDg4x5e14ISco7WlHEZnq_texgH5r8PXMuI5w6JEsA_kcrIuR_CH3CEN9LrzNsRrZ2luAVaWSLp0-tYxQ97Z';
const HEADERS = {
  headers: {
    Authorization: `Bearer ${TOKEN_API}`,
  },
};

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, HEADERS)
    .then(data => data.json());

export const searchAlbums = query => search(query, 'album');
export const searchArtists = query => search(query, 'artist');
export const searchTracks = query => search(query, 'track');
export const searchPlaylists = query => search(query, 'playlist');

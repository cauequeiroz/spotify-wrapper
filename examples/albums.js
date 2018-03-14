import SpotifyWrapper from '../src/index';
import fetch from 'node-fetch';

global.fetch = fetch;

const spotify = new SpotifyWrapper({
  token: 'BQB1Lzk5MmtQ8h8Yn4Hlt-mt9sFfNzhKda1SclOa7E5w1z75Yvyj9NUVncwLJDDwZYJYDSOZYHHqCWJp0I4wMlDj52TJbnAu2xSMdFZlEzmc6ATsJKQeK9p64ubeaKDb-Fv1D5hQ_2L151e2MTo'
})

const albums = spotify.search.albums('Paramore');

albums.then(data => data.albums.items.map(item => console.log(item.name)));

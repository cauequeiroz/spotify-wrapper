import SpotifyWrapper from '../src/index';
global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQBErYIJQmBi-_SIfFrHR6JzecT5YVITlsnVL5g5Q5LNOd0vmjLRDOCRFDLSrFduf9c8oZt-v-tOVwcbYWkh3vhPJWZ16l13VkpxdHDIU11xqPrCw-m9sx6uPfD7gYAuyH1LYJCVnl6KBjbY'
});
const albums = spotify.search.albums('blackbear');

albums
  .then(data =>
    data.albums.items.map(item => console.log(item.name)));

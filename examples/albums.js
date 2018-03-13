import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');

const albums = searchAlbums('Paramore');

albums.then(data => data.albums.items.map(item => console.log(item.name)));

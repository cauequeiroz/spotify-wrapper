global.fetch = require('node-fetch');

import { searchAlbums } from '../src/main';

console.log('\n');
console.log('Showing albuns for blackbear band:');
console.log('\n');
const albums = searchAlbums('blackbear');
albums
  .then(data => data.albums.items.map(item => console.log(`### ${item.name}`)));

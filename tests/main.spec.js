import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => fetchedStub.restore());

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      context('passing just on type', () => {
        const artists = search('blackbear', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=artist');

        const albums = search('blackbear', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=album');
      });

      context('passing multiple types', () => {
        const artistsAndAlbums = search('blackbear', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=blackbear&type=artist,album');
      });
    });

    it('should return JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('blackbear', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

});

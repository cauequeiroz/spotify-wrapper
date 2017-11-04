import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Search', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

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
    it('should call fetch function', () => {
      const artists = search();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      context('passing just on type', () => {
        const artists = search('blackbear', 'artist');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=artist');

        const albums = search('blackbear', 'album');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=album');
      });

      context('passing multiple types', () => {
        const artistsAndAlbums = search('blackbear', ['artist', 'album']);
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=blackbear&type=artist,album');
      });
    });

    it('should return JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('blackbear', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('blackbear');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const artists = searchArtists('blackbear');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=artist');

      const artists2 = searchArtists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('blackbear');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const albums = searchAlbums('blackbear');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=album');

      const albums2 = searchAlbums('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('blackbear');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const tracks = searchTracks('blackbear');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=track');

      const tracks2 = searchTracks('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('blackbear');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const playlists = searchPlaylists('blackbear');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=blackbear&type=playlist');

      const playlists2 = searchPlaylists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});

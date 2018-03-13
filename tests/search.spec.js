import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {

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

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {
        const artists = search('Paramore', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=artist');

        const albums = search('Paramore', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Paramore', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=artist,album');
      });

    });

    it('should return the JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const albums = search('Paramore', 'album');
      expect(albums.resolveValue).to.be.eql({ body: 'json' });
    });

  });

  describe('searchAlbums', () => {

    it('should call fetch function', () => {
      const albums = searchAlbums('Paramore');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = searchAlbums('Paramore');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=album');
    });

  });

  describe('searchArtists', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('Paramore');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchArtists('Paramore');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=artist');
    });

  });

  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const tracks = searchTracks('Paramore');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = searchTracks('Paramore');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=track');
    });

  });

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {
      const playlists = searchPlaylists('Paramore');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const playlists = searchPlaylists('Paramore');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=playlist');
    });

  });

});

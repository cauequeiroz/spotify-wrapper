import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo' });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist spotify.album.getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should exist spotify.album.getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should exist spotify.album.getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('spotify.album.getAlbum', () => {
    it('should call fetch function', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

      const album2 = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Bcc');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bcc');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('spotify.album.getAlbums', () => {
    it('should call fetch function', () => {
      const albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(albums.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('spotify.album.getTracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const tracks = spotify.album.getTracks('6akEvsycLGftJxYudPjmqK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks');

      const tracks2 = spotify.album.getTracks('6akEvsycLGftJxYudPjmqC');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqC/tracks');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const tracks = spotify.album.getTracks('6akEvsycLGftJxYudPjmqK');
      expect(tracks.resolveValue).to.be.eql({ body: 'json' });
    });
  });

});

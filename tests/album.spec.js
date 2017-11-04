import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {
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
    it('should exist getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should exist getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should exist getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

      const album2 = getAlbum('0sNOF9WDwhWunNAHPD3Bcc');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bcc');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(albums.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch function', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const tracks = getAlbumTracks('6akEvsycLGftJxYudPjmqK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks');

      const tracks2 = getAlbumTracks('6akEvsycLGftJxYudPjmqC');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqC/tracks');
    });

    it('should return JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const tracks = getAlbumTracks('6akEvsycLGftJxYudPjmqK');
      expect(tracks.resolveValue).to.be.eql({ body: 'json' });
    });
  });

});

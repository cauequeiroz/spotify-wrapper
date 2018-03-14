import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import fetch from 'node-fetch';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = fetch;

describe('SpotifyWrapper', () => {

  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper)
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'foo'
    });

    expect(spotify.apiURL).to.be.equal('foo');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1/');
  });

  it('should receive a token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'bar'
    });

    expect(spotify.token).to.be.equal('bar');
  });

  describe('Request method', () => {

    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should exist the request method', () => {
      const spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('should call fetch function when request', () => {
      const spotify = new SpotifyWrapper({ token: 'foo' });

      spotify.request();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch function with the right url', () => {
      const spotify = new SpotifyWrapper({ token: 'foo' });

      spotify.request('http://foo.bar/');
      expect(stubedFetch).to.have.been.calledWith('http://foo.bar/');
    });

    it('should call fetch function with the right header', () => {
      const spotify = new SpotifyWrapper({ token: 'foo' });
      const headers = { headers: { Authorization: `Bearer foo` } };

      spotify.request('http://foo.bar/');
      expect(stubedFetch).to.have.been.calledWith('http://foo.bar/', headers);
    });

    it('should return json data', () => {
      promise.resolves({ body: 'foo' });

      const spotify = new SpotifyWrapper({ token: 'foo' });
      const headers = { headers: { Authorization: `Bearer foo` } };

      const request = spotify.request('http://foo.bar/');
      expect(request.resolveValue).to.be.eql({ body: 'foo' });
    });
  });

});

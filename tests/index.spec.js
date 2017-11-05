import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify Wrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should recieve apiUrl as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'foo'
    });
    expect(spotify.apiURL).to.be.equal('foo');
  });

  it('should use default apiURL when not provieded', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1/');
  });

  it('should recieve token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'bar'
    });
    expect(spotify.token).to.be.equal('bar');
  });
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

  it('should have request method', () => {
    let spotify = new SpotifyWrapper({ token: 'foo' });
    expect(spotify.request).to.exist;
  });

  it('should call fetch function when request', () => {
    let spotify = new SpotifyWrapper({ token: 'foo' });

    spotify.request();
    expect(stubedFetch).to.have.been.calledOnce;
  });

  it('should call fetch function with right url passed', () => {
    let spotify = new SpotifyWrapper({ token: 'foo' });

    spotify.request('http://foo.com/');
    expect(stubedFetch).to.have.been.calledWith('http://foo.com/');
  });

  it('should call fetch function with right headers', () => {
    let spotify = new SpotifyWrapper({ token: 'foo' });

    const headers = {
      headers: {
        Authorization: `Bearer foo`,
      },
    };

    spotify.request('http://foo.com/');
    expect(stubedFetch).to.have.been.calledWith('http://foo.com/', headers);
  });
});

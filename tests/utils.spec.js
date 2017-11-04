import { expect } from 'chai';
import toJSON from '../src/utils';

describe('Utils', () => {

  describe('toJSON', () => {
    it('should exist toJSON method', () => {
      expect(toJSON).to.exist;
    });

    it('should convert data to json', () => {
      const data = {
        string: '{"body":"some info"}',
        json: function() {
          return JSON.parse(this.string);
        }
      };
      const converted = toJSON(data);
      expect(converted).to.be.eql({ body: 'some info' });
    });
  });
});

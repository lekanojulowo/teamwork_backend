const assert = require('chai').assert;
// const assert = require('assert');
const sayHello = require ('../src/appt').sayHello;


describe('App', () => {
  describe('sayHello()', () => {
    it('should return Welcome', () => {
      assert.equal(sayHello(), 'Welcome', 'expect welcome');
      // assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('sayHello()', () => {
    it('should return type string', () => {
      assert.typeOf(sayHello(), 'string', 'expect string');
      // assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


const assert = require('chai').assert;
// const assert = require('assert');
const sayHello = require ('../appt').sayHello;


// describe('Hello', function() {
//   it('shoulds return hello', function() {
//     assert.equal(hello(), "hello ");
//   });
// });
// describe('App', function() {
//   it('respond with matching records', function() {
//     return db.find({type: 'User'}).should.eventually.have.length(3);
//   });
// });n


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


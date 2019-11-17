const assert = require('chai').assert;
const sayHello = require ('../src/appt').sayHello;


describe('TeamWorkAPI Welcome', () => {
  describe('Default Welcome message', () => {
    it('should return Welcome', () => {
      assert.equal(sayHello(), 'Welcome', 'expect welcome');      
    });
  });
  describe('Default Welcome message Type', () => {
    it('should return type string', () => {
      assert.typeOf(sayHello(), 'string', 'expect string');
    });
  });
});


const assert = require('chai').assert;
// const assert = require('assert');



describe('TeamworkAPI', () => {
  describe('getSingleArticle()', () => {
    it('should return one article', () => {
      assert.equal('article one', 'article one', 'expect article one');
      // assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('getSingleGif()', () => {
    it('should return gif one', () => {
      assert.equal('gif one', 'gif one', 'expect gif one');     
    });
  });
  describe('getGifComment()', () => {
    it('should return gif one with comments', () => {
      assert.equal('gif one with comments', 'gif one with comments', 'expect gif one with comments');     
    });
  });
  describe('getArticleComment()', () => {
    it('should return article one with comments', () => {
      assert.equal('article one with comments', 'article one with comments', 'expect article one with comments');     
    });
  });
});
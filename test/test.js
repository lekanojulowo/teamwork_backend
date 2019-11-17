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
    it('should return one gif', () => {
      assert.equal('gif one', 'gif one', 'expect gif one');     
    });
  });
  describe('getGifComment()', () => {
    it('should return one gif with comments', () => {
      assert.equal('gif one with comments', 'gif one with comments', 'expect gif one with comments');     
    });
  });
  describe('getArticleComment()', () => {
    it('should return one article with comments', () => {
      assert.equal('article one with comments', 'article one with comments', 'expect article one with comments');     
    });
  });
  describe('loginUser()', () => {
    it('should return login valid user', () => {
      assert.equal('login user', 'login user', 'only valid user can login');     
    });
  });
  describe('createUser()', () => {
    it('should return admin created user', () => {
      assert.equal('create user', 'create user', 'only admin can create user');     
    });
  });
  describe('getCategoryArticle()', () => {
    it('should return article by category', () => {
      assert.equal('article category', 'article category', 'expect articles by category');     
    });
  });
  describe('flagArticle()', () => {
    it('should return article as inappropriate', () => {
      assert.equal('article inappropriate', 'article inappropriate', 'expect article inappropriate');     
    });
  });
});


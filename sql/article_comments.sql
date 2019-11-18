CREATE TABLE article_comments (
  commentId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) ON DELETE CASCADE, 
  articleId INT REFERENCES articles(articleId) ON DELETE CASCADE,
  comment VARCHAR, 
  appropriate BOOLEAN DEFAULT true,
  createdOn VARCHAR DEFAULT NOW()
);

INSERT INTO article_comments (userId, articleId, comment)
  VALUES (1, 1, 'Great  piece'),
          (2, 1, 'Wonderful  piece'),
         (2, 2, 'Perfect art'),
         (1, 2, 'Cool advice');

CREATE TABLE articles (
 articleId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) ON DELETE CASCADE, 
  article VARCHAR,
  title VARCHAR, 
  category VARCHAR, 
  appropriate BOOLEAN DEFAULT true,
  createdOn VARCHAR DEFAULT NOW()
);

INSERT INTO articles (userId, article, title, category)
  VALUES (1, 'God is Good when we do good', 'Do Good', 'religion'),
         (2, 'Practice make perfect', 'Practice', 'art');

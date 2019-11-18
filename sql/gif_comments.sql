CREATE TABLE gif_comments (
  commentId SERIAL PRIMARY KEY,
  userId INT REFERENCES users(userId) ON DELETE CASCADE, 
  gifId INT REFERENCES gifs(gifId) ON DELETE CASCADE,
  comment VARCHAR,
  appropriate BOOLEAN DEFAULT true, 
  createdOn VARCHAR DEFAULT NOW()
);

INSERT INTO gif_comments (userId, gifId, comment)
  VALUES (1, 1, 'Splendid image'),
          (2, 1, 'Awesome art'),
         (2, 2, 'Awesome artwrok'),
         (1, 2, 'cool artwrok');

CREATE TABLE gifs (
  gifId SERIAL PRIMARY KEY,
  userId BIGINT REFERENCES users(userId) ON DELETE CASCADE, 
  imageUrl VARCHAR,
  title VARCHAR, 
  appropriate BOOLEAN DEFAULT true, 
  createdOn VARCHAR DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO gifs (userId, imageUrl, title)
  VALUES (1, 'https://res.cloudinary.com/lekanojulowo/image/upload/v1573772113/csdxuilrtjakj0kn8muk.gif', 'NACOSS OSUSTECH'),
         (2, 'https://res.cloudinary.com/lekanojulowo/image/upload/v1573772113/csdxuilrtjakj0kn8muk.gif', 'cool nacoss osustech logo');

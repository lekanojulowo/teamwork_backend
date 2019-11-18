CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  firstName VARCHAR,
  lastName VARCHAR,
  email VARCHAR,
  password VARCHAR,
  gender VARCHAR,
  jobRole VARCHAR,
  department VARCHAR,  
  address VARCHAR,
  admin BOOLEAN DEFAULT false,
  createdOn VARCHAR DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, admin)
  VALUES ('user1', 'userone', 'user1@gmail.com', 'user1','M', 'Developer', 'Software', 'Ado-Ekiti', true),
         ('user2', 'usertwo', 'user2@gmail.com', 'user2','M', 'Admin', 'Administrative', 'Ado-Ekiti', false);
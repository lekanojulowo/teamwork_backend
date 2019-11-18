CREATE TABLE categories (
  catId SERIAL PRIMARY KEY,
  category VARCHAR,  
  createdOn VARCHAR DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (category)
  VALUES ('education'),
        ('religion'),
        ('sport'),
        ('art'),
        ('food'),
        ('health'),
        ('computer'),
        ('comedy'),
        ('humor'),     
        ('politics'),     
        ('entertainment'),     
        ('lifestyle'),     
        ('nature'),
        ('agriculture'),
        ('business'),
        ('technology');
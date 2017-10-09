DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
	
VALUES ("Athletic Tape", "Sporting Goods", 19.95, 150),
  ("Halo Top", "Grocery", 3.99, 200),
  ("Coconut Butter", "Grocery", 24.50, 50),
  ("Vaseline", "Grooming", 2.00, 5),
  ("Leather Dress Shoes", "Apparel", 114.99, 15),
  ("NFL Sunday Ticket", "Subscriptions", 24.99, 42),
  ("Nike Air Jordan 1", "Apparel", 499.99, 5),
  ("Foam Roller", "Sporting Goods", 17.99, 128),
  ("Jump Rope", "Sporting Goods", 39.99, 200),
  ("Nespresso Coffee Maker", "Appliance", 199.95, 49);
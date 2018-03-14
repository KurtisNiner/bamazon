DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products 
			(product_name, department_name, price, stock_quantity)

VALUES ("nike shocks", "footwear", 100.00, 10),
				("banana", "fruit", 1.00, 20),
                ("apple", "fruit", .50, 20),
                ("orange","fruit", .20, 25),
                ("chicken", "poultry", 2.00, 30),
                ("barbaque", "pork", 5.00, 10),
                ("dove", "soap", 4.00, 50),
                ("dove shampoo", "shampoo", 3.50, 30),
                ("method", "hand soap", 2.50, 40),
                ("tide pods", "detergent", 10.00, 35);
                
SELECT * FROM bamazon.products
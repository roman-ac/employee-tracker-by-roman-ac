DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


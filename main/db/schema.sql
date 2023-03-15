DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

)

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager BOOLEAN NOT NULL
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
)
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL
    );

CREATE TABLE employee_role (
     id SERIAL PRIMARY KEY,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL,
     department INTEGER,
     FOREIGN KEY (department) 
     REFERENCES department(id)
     ON DELETE SET NULL,
     status VARCHAR(30) NOT NULL
    );

CREATE TABLE employee (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INTEGER,
     manager_id INTEGER,
     FOREIGN KEY (role_id) 
     REFERENCES employee_role(id)
     ON DELETE SET NULL,
     FOREIGN KEY (manager_id) 
     REFERENCES employee(id)
     ON DELETE SET NULL,
     status VARCHAR(30) NOT NULL
    );


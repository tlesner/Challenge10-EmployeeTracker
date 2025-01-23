-- INSERT INTO department (department_name)
-- VALUES
--     ('Human Resources'),
--     ('Engineering'),
--     ('Sales'),
--     ('Marketing');


-- INSERT INTO employee_role (title, salary, department)
-- VALUEs ('Hiring Manager', 55000, 1),
--     ('Systems Engineer', 80000, 2),
--     ('Sales ', 50000, 3),
--     ('Marketing Manager', 80000, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUEs ();

-- --potentially need to use transactions in this file.

-- Genereated via ChatGPT
-- Insert seed data into department table
INSERT INTO department (department_name, status) VALUES
('Human Resources', 'active'),
('Engineering', 'active'),
('Sales', 'active'),
('Marketing', 'active');

-- Insert seed data into employee_role table
INSERT INTO employee_role (title, salary, department, status) VALUES
('HR Manager', 75000, 1, 'active'),
('Software Engineer', 90000, 2, 'active'),
('Sales Representative', 60000, 3, 'active'),
('Marketing Specialist', 55000, 4, 'active');

-- Insert seed data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id, status) VALUES
('Alice', 'Johnson', 1, NULL, 'active'), -- HR Manager
('Bob', 'Smith', 2, NULL, 'active'), -- Software Engineer
('Charlie', 'Brown', 3, 1, 'active'), -- Sales Rep reporting to Alice
('Diana', 'Prince', 4, 2, 'active'); -- Marketing Specialist reporting to Bob
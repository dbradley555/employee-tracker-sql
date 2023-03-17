INSERT INTO department (department_name)
VALUES ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 001),
        ('Salesperson', 80000, 001),
        ('Lead Engineer', 150000, 002),
        ('Software Engineer', 120000, 002),
        ('Account Manager', 160000, 003),
        ('Accountant', 125000, 003),
        ('Legal Team Lead', 250000, 004),
        ('Lawyer', 190000, 004),
        ('CEO', 500000, 005),
        ('CFO', 400000, 005);

INSERT INTO employee (first_name, last_name, manager, role_id)
VALUES ('John', 'Doe', TRUE,  001),
        ('Mike', 'Chan', FALSE,  002),
        ('Ashley', 'Rodriguez', TRUE,  003),
        ('Kevin', 'Tupik', FALSE,  004),
        ('Kunal', 'Singh', TRUE,  005),
        ('Malia', 'Brown', FALSE, 006),
        ('Sarah', 'Lourd', TRUE,  007),
        ('Tom', 'Allen', FALSE,  008),
        ('Sam', 'Kash', FALSE, 002);

INSERT INTO employee (first_name, last_name, manager, role_id)
VALUES  ('Daniel', 'Bradley', TRUE, 009),
        ('Laura', 'Thompson', TRUE, 010);
       

UPDATE employee SET manager_id = 10 WHERE id = 1;       
UPDATE employee SET manager_id = 1 WHERE id = 2;       
UPDATE employee SET manager_id = 10 WHERE id = 3;       
UPDATE employee SET manager_id = 3 WHERE id = 4;       
UPDATE employee SET manager_id = 11 WHERE id = 5;       
UPDATE employee SET manager_id = 5 WHERE id = 6;       
UPDATE employee SET manager_id = 10 WHERE id = 7;       
UPDATE employee SET manager_id = 7 WHERE id = 8;       
UPDATE employee SET manager_id = 1 WHERE id = 9;       
     
INSERT INTO department (department_name)
VALUES (Sales),
        (Engineering),
        (Finance),
        (Legal),
        (Management)

INSERT INTO   role (title, salary, department_id)
VALUES (Sales Lead, 100000, 001),
        (Salesperson, 80000, 001),
        (Lead Engineer, 150000, 002),
        (Software Engineer, 120000, 002),
        (Account Manager, 160000, 003),
        (Accountant, 125000, 003),
        (Legal Team Lead, 250000, 004),
        (Lawyer, 190000, 004),
        (CEO, 500000, 005),
        (CFO, 400000, 005)

INSERT INTO employee (first_name, last_name, manager, role_id, manager_id)
VALUES (John, Doe, TRUE,  001, 010),
        (Mike, Chan, FALSE,  002, 001),
        (Ashley, Rodriguez, TRUE,  003, 010),
        (Kevin, Tupik, FALSE,  004, 003),
        (Kunal, Singh, TRUE,  005, 011),
        (Malia, Brown, FALSE, 006, 005),
        (Sarah, Lourd, TRUE,  007, 010),
        (Tom, Allen, FALSE,  008, 007),
        (Sam, Kash, FALSE, 002, 010),
        (Daniel, Bradley, TRUE, 009, NULL)
        (Laura, Thompson, TRUE, 010, NULL)
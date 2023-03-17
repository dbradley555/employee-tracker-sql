SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id, CONCAT (m.first_name, ' ', m.last_name) AS Manager
FROM employee
LEFT JOIN 
role ON role.id=employee.role_id
LEFT JOIN 
department ON role.department_id = department.id
LEFT JOIN
employee m ON employee.manager_id = m.id

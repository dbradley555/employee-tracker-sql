const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function questionLoop(data) {
  if (data.initialanswer === 'View All Employees') {
    viewEmployees();
  } else if (data.initialanswer === 'Add Employee') {
    addEmployee();
  } else if (data.initialanswer === 'Update Employee Role') {
    updateEmployeeRole();
  } else if (data.initialanswer === 'View All Roles') {
    viewAllRoles();
  } else if (data.initialanswer === 'Add Role') {
    addRole();
  } else if (data.initialanswer === 'View All Departments') {
    viewDepartments();
  } else if (data.initialanswer === 'Add Department') {
    addDepartment();
  } else if (data.initialanswer === 'Quit') {
    return;
  }
}

// Function to show a table of all employees and data in console
function viewEmployees() {
  // show table in console with info about all employees
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id";

  db.promise()
    .query(sql)
    .then((results) => console.table(results[0]))
    .then(() => init());
}

// Function to add and employee to the database
function addEmployee() {
  const sql2 =
    "SELECT CONCAT (first_name, ' ', last_name) AS manager FROM employee WHERE manager = TRUE";
  db.promise()
    .query(sql2)
    .then((response) => {
      const managerArray = response[0];
      const managerList = managerArray.map((response) => response.manager);

      return managerList;
    })
    .then((managerList) => {
      const sql = 'SELECT title FROM role';
      db.promise()
        .query(sql)
        .then((response) => {
          const roleArray = response[0];
          const roleList = roleArray.map((response) => response.title);

          return roleList;
        })
        .then((roleList) => {
          const addEmployeeQuestions = [
            {
              type: 'input',
              name: 'firstname',
              message: "What is the employee's first name?",
            },
            {
              type: 'input',
              name: 'lastname',
              message: "What is the employee's last name?",
            },
            {
              type: 'list',
              name: 'jobtitle',
              message: "What is the employee's role? ",
              choices: roleList,
            },
            {
              type: 'list',
              name: 'managerBoolean',
              message: 'Is this employee in a manager role?',
              choices: ['TRUE', 'FALSE'],
            },
            {
              type: 'list',
              name: 'manager',
              message: "Who is the employee's manager?",
              choices: managerList,
            },
          ];
          inquirer.prompt(addEmployeeQuestions).then((data) => {
            db.promise()
              .query(`SELECT id FROM role WHERE title = '${data.jobtitle}'`)
              .then((results) => {
                const roleIDArray = results[0];
                const roleID = roleIDArray.map((response) => response.id);

                return roleID;
              })
              .then((roleID) => {
                const sql = `SELECT id FROM employee WHERE CONCAT (first_name, ' ', last_name) = '${data.manager}'`;
                db.promise()
                  .query(sql)
                  .then((results) => {
                    const employeeIDArray = results[0];

                    const employeeID = employeeIDArray.map(
                      (response) => response.id
                    );

                    return employeeID;
                  })
                  .then((employeeID) => {
                    const sql3 = `INSERT INTO employee (first_name, last_name, manager, role_id, manager_id) VALUES ('${data.firstname}', '${data.lastname}', ${data.managerBoolean}, ${roleID}, ${employeeID})`;
                    db.promise()
                      .query(sql3)
                      .then(() => {
                        console.log(
                          `${data.firstname} ${data.lastname} was added to the database!`
                        );
                      })
                      .then(() => {
                        viewEmployees();
                      });
                  });
              });
          });
        });
    });
}

// Function to change the role on a current employee
function updateEmployeeRole() {
  const sql = 'SELECT title FROM role';

  db.promise()
    .query(sql)
    .then((response) => {
      const roleArray = response[0];
      const roleList = roleArray.map((response) => response.title);

      return roleList;
    })
    .then((roleList) => {
      const updateEmployeeRoleQuestions = [
        {
          type: 'input',
          name: 'employeefirstname',
          message:
            'Please enter the first name of the employee you would like to update: ',
        },
        {
          type: 'input',
          name: 'employeelastname',
          message:
            'Please enter the last name of the employee you would like to update: ',
        },
        {
          type: 'list',
          name: 'employeenewrole',
          message: 'Please enter the new role: ',
          choices: roleList,
        },
      ];
      inquirer.prompt(updateEmployeeRoleQuestions).then((data) => {
        // find employee in database based on first and last name
        // update table with new role
        db.promise()
          .query(`SELECT id FROM role WHERE title = '${data.employeenewrole}'`)
          .then((results) => {
            const roleIDArray = results[0];
            const roleID = roleIDArray.map((response) => response.id);

            return roleID;
          })
          .then((roleID) => {
            const sql = `UPDATE employee SET role_id = ${roleID} WHERE first_name = '${data.employeefirstname}' AND last_name = '${data.employeelastname}'`;
            db.promise()
              .query(sql)
              .then(() => {
                console.log(
                  `${data.employeefirstname} ${data.employeelastname}'s role updated to ${employeenewrole}`
                );
              })
              .then(() => {
                viewEmployees();
              });
          });
      });
    });
}

// Function to view a table of all roles
function viewAllRoles() {
  // show table in console with all roles
  const sql = 'SELECT role.title AS Titles FROM role';
  db.promise()
    .query(sql)
    .then((results) => console.table(results[0]))
    .then(() => init());
}

// Function for response to Add a Role to the database
function addRole() {
  const sql = 'SELECT department_name FROM department';

  db.promise()
    .query(sql)
    .then((response) => {
      const departmentArray = response[0];
      const departmentList = departmentArray.map(
        (response) => response.department_name
      );

      return departmentList;
    })
    .then((departmentArray) => {
      const addRoleQuestion = [
        {
          type: 'input',
          name: 'rolename',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          name: 'rolesalary',
          message: 'What is the salary of the role? ',
        },
        {
          type: 'list',
          name: 'roledepartment',
          message: 'What department does the role belong to?',
          choices: departmentArray,
        },
      ];

      inquirer.prompt(addRoleQuestion).then((data) => {
        // add role to the table of roles
        db.promise()
          .query(
            `SELECT id FROM department WHERE department_name = '${data.roledepartment}'`
          )
          .then((results) => {
            const departmentIDArray = results[0];
            const departmentID = departmentIDArray.map(
              (response) => response.id
            );

            return departmentID;
          })
          .then((departmentID) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${data.rolename}', '${data.rolesalary}', ${departmentID})`;
            db.promise()
              .query(sql)
              .then(() => {
                console.log(`${data.rolename} successfully added!`);
              })
              .then(() => {
                viewAllRoles();
              });
          });
      });
    });
}

// Function to view a table of all departments in the console
function viewDepartments() {
  // show table in console with all departments
  const sql = 'SELECT department_name FROM department';
  db.promise()
    .query(sql)
    .then((results) => console.table(results[0]))
    .then(() => init());
}

// Function to add a department to the database
function addDepartment() {
  const addDepartmentQuestion = [
    {
      type: 'input',
      name: 'departmentname',
      message: 'What is the name of the department?',
    },
  ];
  inquirer.prompt(addDepartmentQuestion).then((data) => {
    // add department to the table of departments
    const sql = `INSERT INTO department (department_name) VALUES ('${data.departmentname}')`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully added ${data.departmentname} to the table.`);
        viewDepartments();
      }
    });
  });
}

// Function that initializes inquirer app
function init() {
  const initialQuestion = {
    type: 'list',
    name: 'initialanswer',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit',
    ],
  };
  inquirer.prompt(initialQuestion).then((response) => questionLoop(response));
}
init();

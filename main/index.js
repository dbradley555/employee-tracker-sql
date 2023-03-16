const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

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
    type: 'input',
    name: 'employeenewrole',
    message: 'Please enter the new role: ',
  },
];

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
    choices: getRoles(),
  },
  {
    type: 'list',
    name: 'manager',
    message: "Who is the employee's manager?",
    choices: getManagers(),
  },
];

const addDepartmentQuestion = [
  {
    type: 'input',
    name: 'departmentname',
    message: 'What is the name of the department?',
  },
];

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
    choices: getDepartments(),
  },
];

function init() {
  inquirer.prompt(initialQuestion).then((data) => questionLoop(data));
}

function questionLoop(data) {
  if (data.initialanswer === 'View All Employees') {
    viewEmployees();
  } else if (data.initialanswer === 'Add Employee') {
    addEmployee();
  } else if (data.initialanswer === 'Update Employee Role') {
    updateRole();
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

function viewEmployees() {
  // show table in console with info about all employees
  const sql =
    'SELECT employee.first_name AS First Name, employee.last_name AS Last Name, role.title AS Title, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager FROM employee JOIN ';
  db.query(sql, (err, result) => {
    console.table(result);
  });

  init();
}

function addEmployee() {
  inquirer.prompt(addEmployeeQuestions).then((data) => {
    // use data to add all employee information to database

    init();
  });
}

function updateRole() {
  inquirer.prompt(updateEmployeeRoleQuestions).then((data) => {
    // find employee in database based on first and last name
    // update table with new role

    init();
  });
}
function viewAllRoles() {
  // show table in console with all roles
  const sql = 'SELECT role.title AS Titles FROM role';
  db.query(sql, (err, result) => {
    console.table(result);
  });
  init();
}

function addRole() {
  inquirer.prompt(addRoleQuestion).then((data) => {
    // add role to the table of roles

    viewAllRoles();
    init();
  });
}
function viewDepartments() {
  // show table in console with all departments
  const sql = 'SELECT name AS Departments FROM department';
  db.query(sql, (err, result) => {
    console.table(result);
  });
  init();
}
function addDepartment() {
  inquirer.prompt(addDepartmentQuestion).then((data) => {
    // add department to the table of departments

    viewDepartments();
    init();
  });
}

function getDepartments() {
  // get list of departments from table
  const sql = 'SELECT name FROM department';
  db.query(sql, (err, result) => {
    const departmentArray = new Array(result);
    return departmentArray;
  });
}

function getManagers() {
  // get list of employees that are in leadership role
  const sql =
    'SELECT first_name AS First Name, last_name AS Last Name FROM employee WHERE manager = TRUE';
  db.query(sql, (err, result) => {
    const managerArray = new Array(result);
    return managerArray;
  });
}

function getRoles() {
  // get list of available roles
  const sql = 'SELECT title AS Title FROM role';
  db.query(sql, (err, result) => {
    const roleArray = new Array(result);
    return roleArray;
  });
}

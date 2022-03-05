const path = require('path');
const mysql = require ('mysql2');
const inquirer = require("inquirer");
const fs = require('fs');



require('dotenv').config();
 

const db = mysql.createConnection (
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'employee_db'
    },
    console.log(`Connected to employee_db database....\n`)
);

// connect to the mysql server and sql database
db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    firstPrompt();
  });

  // function which prompts the user for what action they should take
function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
        "View All Departments", 
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role"
        ]
      })

      .then(function ({ task }) {

        switch (task) {
        case "View All Departments":
            viewDepartments();
        break;
        case "View All Roles":
            viewRoles();
        break;
        case "View All Employees":
            viewEmployee();
        break;
        case "Add A Department":
            addDepartment();
        break;
        case "Add A Role":
            addRoles();
        break;
        case "Add An Employee":
            addEmployee();
        break;
        case "Update An Employee Role":
            updateEmployee();
        break;
        }
      })
  };

  // view all departments
function viewDepartments() {
    console.log("Selecting all departments...\n");
    db.query("SELECT id AS `ID`, department AS `Department` FROM departments", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      anythingElse();
  
    })
    };

      // view all roles
    function viewRoles() {
        console.log("Selecting all roles...\n");
        db.query("SELECT title AS `Title`, salary AS `Salary`, dep_id AS `Department Id` FROM roles", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          anythingElse();
      
        });
      }

            // view all employees
      function viewEmployee() {
        console.log("Selecting all employees...\n");
        db.query("SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role Id` FROM employees", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          anythingElse();
      
        })
      };

      // function to add a new department
      function addDepartment() {
        // getting the data
        db.query("SELECT * FROM departments", function (err, res) {
          if (err) throw err;
          const departments = res.map(element => {
            return element.id
          })
          inquirer
            .prompt([
              {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
              }
      
            ])
            .then(function (answer) {
              // when finished prompting, insert a new item into the db with that info
              db.query(
                "INSERT INTO departments SET ?",
                answer,
                function (err) {
                  if (err) throw err;
                  console.log(`${answer.department} was added successfully`);

                  anythingElse();
                }
              )
            })
        })
      };

      //function to add a new role
      function addRoles() {
        // we need to get the role data
        db.query("SELECT * FROM departments", function (err, res) {
          if (err) throw err;
          const departments = res.map(element => {
            return element.department
            
          })
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "What's the new role title?"
              },
              {
                name: "salary",
                type: "input",
                message: "What is their salary?"
              },
              // ask role question based on role data
              {
                name: "dep_id",
                type: "list",
                message: "What is their department?",
                choices: departments
              }
      
            ])
            .then(function (answer) {
              // when finished prompting, insert a new item into the db with that info
              db.query(
                "INSERT INTO roles SET ?",
                answer,
                function (err) {
                  if (err) throw err;
                  console.log(`${answer.title} was added successfully`);

                  anythingElse();
                  
                }
              )
            })
        })
      };

      // function to add an employee
      function addEmployee() {
        db.query("SELECT id, title from roles", function (err, res) {
          if (err) throw err;
          const roles = res.map(element => element.title)
          inquirer.prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the new employees first name?"
            },{
              name: "lastName",
              type: "input",
              message: "What is the new employees last name?"
            }, {
              name: "roles",
              type: "list",
              message: "What is the title of their role?",
              choices: roles
            }
          ]).then(answers => {
            const chosenRole = res.find(element => {
              return element.title === answers.roles
            });
            console.log(chosenRole.id);
            const newEmployee = {
              firstName: answers.firstName,
              lastName: answers.lastName,
              roleId: chosenRole.id
            };
            db.query("INSERT INTO employees SET ?", newEmployee, (err, success) => {
              if (err) throw err;
              console.log(`${newEmployee.firstName} was added successfully`);

              anythingElse();

            })
      
          })
      
        })
      
      };

      // function to update an employee (got lot of help with this)
      function updateEmployee() {
        db.query("Select * from employees", function (err, res) {
          if (err) throw err;
          //new list of first and last names
          const names = res.map(element => {
            return `${element.id}: ${element.first_name} ${element.last_name}`
          })
          db.query("SELECT title, id from roles", function(err, success) {
            if (err) throw err;
            const roles = success.map(element => element.title);  
            inquirer.prompt([
              {
                name: "who",
                type: "list",
                choices: names,
                message: "Whom would you like to update?"
              }, {
                name: "roles",
                type: "list",
                message: "What is the title of their new role?",
                choices: roles
              }
            ]).then(answers => {
              console.log(answers);
              const empIdToUpdate = answers.who.split(":")[0];
              console.log(empIdToUpdate)
              const chosenRole = success.find(element => {
                return element.title === answers.roles
              });
              console.log(chosenRole.id);
              db.query("UPDATE employees SET role_id=? where id=?", [chosenRole.id, empIdToUpdate], (err, success)=> {
                if (err) throw err;
                console.log(`role successfully changed`);
                
                anythingElse();
                
              })
              
            })
          })
        })
      
      };

      function anythingElse() {
        inquirer.prompt([
          {
            type: "list",
            name: "continue",
            message: "Would you like to continue working?",
            choices: [
              {
                name: "Yes",
                value: true
              },
              {
                name: "No",
                value: false
              }
            ]
          }
        ]).then(function (answers) {
          if (answers.continue) {
            firstPrompt();
          } else {
            console.log(`See Ya!`);
            process.exit();
          }
        })
      };


  
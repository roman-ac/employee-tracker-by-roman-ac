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

        break;
        case "Add An Employee":
        
        break;
        case "Update An Employee Role":
        
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
  
    })
    };

      // view all roles
    function viewRoles() {
        console.log("Selecting all roles...\n");
        db.query("SELECT title AS `Title`, salary AS `Salary`, dep_id AS `Department Id` FROM roles", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
      
        });
      }

            // view all employees
      function viewEmployee() {
        console.log("Selecting all employees...\n");
        db.query("SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role Id` FROM employees", function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
      
        });
      }

      function addDepartment() {
        // we need to get the role data
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
                  // re-prompt the user for if they want to bid or post

                }
              );
            });
        })
      }
  
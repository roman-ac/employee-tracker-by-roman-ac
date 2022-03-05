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
            viewDepartments()
        break;
        case "View All Roles":
            viewRoles();
        break;
        case "View All Employees":

        break;
        case "Add A Department":

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

  
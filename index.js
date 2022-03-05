
const mysql = require ('mysql2');
const inquirer = require("inquirer");


require('dotenv').config();
 

const db = mysql.createConnection (
    {
        host: 'localhost',
        port: 3301,
        user: 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
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


  
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dmoney31!",
    database: "employee_db"
})

connection.connect(err => {
    if(err) throw err;
})

function startQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "View Department", "I am done."],
            name: "choice"
        }
    ]).then(answer => {
        if(answer.choice == "Add Department"){
            addDept()
        }else if(answer.choice == "View Department"){
            viewDept()
        }else {
            console.log("Bye.")
            connection.end()
        }
    })
}

function viewDept(){
    connection.query("SELECT * FROM department", (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")
        startQuestions()
    })
}

function addDept(){
    inquirer.prompt([
        {
            message: "What is the name of the new department?",
            name: "deptName"
        }
    ]).then(answer => {
        let queryString =`
        INSERT INTO department (name)
        VALUES (?)`;
        
        connection.query(queryString, [answer.deptName], err => {
            if(err) throw err
            console.log("Added new Dept")
            startQuestions()
        })
    })
}

startQuestions()
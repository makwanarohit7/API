// Importing the packages required for the project.
const cors = require("cors");

const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

// Used for sending the Json Data to Node API
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);
// Connection String to Database
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rohit123",
  database: "api_database",
  multipleStatements: true,
});

// To check whether the connection is succeed for Failed while running the project in console.
mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Db Connection Succeed");
  } else {
    console.log(
      "Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2)
    );
  }
});

// To Run the server with Port Number
app.listen(3005, () =>
  console.log("Express server is running at port no : 3005")
);

// CRUD Methods
//Get all Employees
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get the Employee Data based on Id
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Employee WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete the Employee Data based on Id
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Data Deletion Successful");
      else console.log(err);
    }
  );
});

//Insert an Employee through the Stored Procedure
app.post("/employees", (req, res) => {
  let emp = req.body;
  console.log(emp);
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @Designation = ?;SET @City = ?;SET @ContactNo = ?; CALL AddorUpdateEmployee(@EmpID,@Name,@Designation,@City,@ContactNo);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.Designation, emp.City, emp.ContactNo],
    (err, rows, fields) => {
      if (!err) res.send("Insertion Completed");
      else console.log(err);
    }
  );
});

//Update an Employee through the Stored Procedure
app.put("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @Designation = ?;SET @City = ?;SET @ContactNo = ?;  CALL AddorUpdateEmployee(@EmpID,@Name,@Designation,@City,@ContactNo);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.Designation, emp.City, emp.ContactNo],
    (err, rows, fields) => {
      if (!err) res.send("Updation Done");
      else console.log(err);
    }
  );
});

// CRUD Methods
//Get all Addresses
app.get("/addresses", (req, res) => {
  mysqlConnection.query("SELECT * FROM addresses", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get the Employee Data based on Id
app.get("/addresses/:AID", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM addresses WHERE AID = ?",
    [req.params.AID],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete the Employee Data based on Id
app.delete("/addresses/:AID", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM addresses WHERE AID = ?",
    [req.params.AID],
    (err, rows, fields) => {
      if (!err) res.send("Data Deletion Successful");
      else console.log(err);
    }
  );
});

//Insert an Employee through the Stored Procedure
app.post("/addresses", (req, res) => {
  let emp = req.body;
  console.log(emp);
  var sql =
    "SET @AID = ? ;SET @Address = ?;CALL AddorUpdateAddress(@AID,@Address);";
  mysqlConnection.query(sql, [emp.AID, emp.Address], (err, rows, fields) => {
    if (!err) res.send("Insertion Completed");
    else console.log(err);
  });
});

//Update an Employee through the Stored Procedure
app.put("/addresses", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @AID = ?;SET @Address = ?;CALL AddorUpdateAddress(@AID,@Address);";
  mysqlConnection.query(sql, [emp.AID, emp.Address], (err, rows, fields) => {
    if (!err) res.send("Updation Done");
    else console.log(err);
  });
});

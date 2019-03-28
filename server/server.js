var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "dbms"
});

con.connect(function(err) {
  if (err) console.log("error occured while connecting with database");
  console.log("Connected!");
});

app.get("/", (req, res) => {
  con.query("SELECT * FROM person", (err, rows, fields) => {
    if (err) {
      console.log("Error in query");
    } else {
      console.log("Success!\n");
      rows = { ...rows[0] };
      console.log(rows);
      res.send(rows);
    }
  });
});

//register user
app.post("/register", (req, res) => {
  console.log("REQ_BODY", req.body);
  let values = [
    req.body.NAME,
    req.body.USERNAME,
    req.body.PASSWORD,
    req.body.PHONE,
    req.body.ADDRESS
  ];
  console.log("values:", values);
  con.query(
    `select * from person where username=?`,
    [req.body.USERNAME],
    (err, result) => {
      if (err) {
        console.log("error in query for username\n", err, "\n", res);
      } else {
        console.log("username query:", result);
        result = { ...result[0] };
        console.log("result:", result);
        if (result.USERNAME === req.body.USERNAME) {
          res.send({ registerSuccess: "false" });
        }
        var sql = `INSERT INTO PERSON
              (
                NAME, USERNAME, PASSWORD, PHONE, ADDRESS
              ) 
              VALUES
              (
                  ?,?,?,?,?
              )`;
        con.query(sql, values, (err, result) => {
          if (err) {
            console.log("Error in query for person");
          } else {
            console.log("Success");
            res.send({ registerSuccess: "true", redirect: "/" });
          }
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  console.log(req.body);
  values = [req.body.USERNAME, req.body.PASSWORD];
  con.query(
    `select * from person where username=? and password=?`,
    values,
    (err, result) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        console.log("Result:", result);
        res.send("Success");
      }
    }
  );
});

app.listen(3001);

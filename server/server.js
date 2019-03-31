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

/************************
/////    BUY          ////
*************************/
app.get("/user/all", (req, res) => {
  con.query(
    "SELECT * FROM product where not USERNAME=?",
    [req.query.USERNAME],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        products = [];
        for (i = 0; i < rows.length; i++) products.push({ ...rows[i] });
        console.log("products", products);
        res.send(products);
      }
    }
  );
});

app.get("/user/hostel", (req, res) => {
  con.query(
    "SELECT * FROM product where TYPE=? and not USERNAME=?",
    ["HOSTEL", req.query.USERNAME],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        products = [];
        for (i = 0; i < rows.length; i++) products.push({ ...rows[i] });
        console.log("products:", products);
        res.send(products);
      }
    }
  );
});

app.get("/user/arts", (req, res) => {
  con.query(
    "SELECT * FROM product where TYPE=? and not USERNAME=?",
    ["ARTS", req.query.USERNAME],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        products = [];
        for (i = 0; i < rows.length; i++) products.push({ ...rows[i] });
        console.log("products", products);
        res.send(products);
      }
    }
  );
});

app.get("/user/electronics", (req, res) => {
  console.log("req electro", req.query.USERNAME);
  con.query(
    "SELECT * FROM product where TYPE=? and not USERNAME=?",
    ["ELECTRONICS", req.query.USERNAME],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        products = [];
        for (i = 0; i < rows.length; i++) products.push({ ...rows[i] });
        console.log("products", products);
        res.send(products);
      }
    }
  );
});

app.get("/user/book", (req, res) => {
  con.query(
    "SELECT * FROM product where TYPE=? and not USERNAME=?",
    ["BOOK", req.query.USERNAME],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\n");
        products = [];
        for (i = 0; i < rows.length; i++) products.push({ ...rows[i] });
        console.log("products", products);
        res.send(products);
      }
    }
  );
});

app.get("/user", (req, res) => {
  console.log("req params", req.query);
  con.query(
    "SELECT * FROM person where USERNAME=?",
    [`${req.query.USERNAME}`],
    (err, rows, fields) => {
      if (err) {
        console.log("Error in query");
      } else {
        console.log("Success!\nrows:", rows);
        res.send({ ...rows[0] });
      }
    }
  );
});

/************************
/////    SELL          ////
*************************/
app.post("/sell", (req, res) => {
  console.log("REQ BODY:", req.body);
  let x = req.body;
  con.query(
    `insert into product (PRODUCTNO,PRODUCTNAME,TYPE,USERNAME,DESCRIPTION,PRICE,IMAGEURL) values (?,?,?,?,?,?,?)`,
    ["", x.PRODUCTNAME, x.TYPE, x.USERNAME, x.DESCRIPTION, x.PRICE, x.IMAGEURL],
    (err, result) => {
      if (err) {
        console.log("Error in query for product");
      } else {
        console.log("Success");
        res.send({ uploadSuccess: "true", redirect: "/userdashboard" });
      }
    }
  );
});

/************************
/////REGISTER & LOGIN ////
*************************/
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
    `select * from person where USERNAME=? and PASSWORD=?`,
    values,
    (err, result) => {
      if (err) {
        console.log("Error in query", result);
      } else {
        console.log("Success!\n");
        console.log("Result:", result);
        res.send("Success");
      }
    }
  );
});

app.listen(3001);

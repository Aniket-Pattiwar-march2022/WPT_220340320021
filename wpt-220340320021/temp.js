// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());

// const bodyParser = require('body-parser');

// app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not

// var result;

// app.post('/poc1', function (req, res) {

// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)

//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });

// app.get('/poc2', function (req, res) {

//         console.log("reading input " + req.query.xyz);

//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});

// app.listen(8081, function () {
//     console.log("server listening at port 8081...");
// });

let dbParameters = {
  host: "localhost",
  user: "aniket",
  password: "cdac",
  database: "byaniket",
  port: 3306,
};
const mysql = require("mysql2");
let conn = mysql.createConnection(dbParameters);

const express = require("express");
const { Console } = require("console");
const app = express();

app.use(express.static("client"));

app.get("/getItem", (req, resp) => {
  let inputbookid = req.query.bookid;
  console.log("BookId received by server: ", inputbookid);
  let output = { status: false, row: {} };
  conn.query(
    "select * from book where bookid=?",
    [inputbookid],
    (err, rows) => {
      if (rows.length > 0) {
        console.log("Connected to database");
        output.status = true;
        output.row = rows[0];
        console.log(rows[0]);
      } else {
        console.log("BookId not found");
      }
      if (err) {
        console.log("Could not connect to database");
      }
      resp.send(output);
    }
  );
});

app.get("/update", (req, resp) => {
  let inputbookid = req.query.bookid;
  let inputname = req.query.bookname;
  let inputprice = req.query.price;
  let output = { status: false, bdetails: {} };
  console.log(inputbookid + inputname + inputprice);
  conn.query(
    "update book set (bookname=?, price=?) where bookid=?",
    [inputname, inputprice, inputbookid],
    (err, res) => {
      if (res.affectedRows > 0) {
        output.status = true;
      } else {
        output.status = false;
      }
      if (err) {
        console.log("Could not connect to database");
      }
      resp.send(output);
    }
  );
});

app.listen(80, function () {
  console.log("server listening at port 80...");
});

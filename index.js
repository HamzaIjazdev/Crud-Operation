const app = require("express")();
const bodyParser = require("body-parser");
let mysql = require("mysql");
const port = 8010;
app.use(bodyParser.json());
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
});
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the MySQL server.");
  }
});
app.get("/students", (req, res) => {
  con.query("select * from student", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/students/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM student WHERE studentID=" + req.params.id;

  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
app.post("/students/add", (req, res) => {
  let data = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
  };

  let sqlQuery = "INSERT INTO student SET ?";

  let query = con.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/students/update/:id", (req, res) => {
  let sqlQuery =
    "UPDATE student SET firstName='" +
    req.body.firstName +
    "', lastName='" +
    req.body.lastName +
    "' WHERE studentID=" +
    req.params.id;

  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

app.delete("/students/delete/:id", (req, res) => {
  let sqlQuery = "DELETE FROM student WHERE studentID=" + req.params.id + "";

  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(`${req.params.id} Record successfully deleted`);
  });
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(port, () =>
  console.log(`The api is live on http://localhost:${port} port.`)
);

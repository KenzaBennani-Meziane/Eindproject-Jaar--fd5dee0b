const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const token = process.env.SLACK_TOKEN;
const mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser());


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : "skil1.mysql.database.azure.com",
  user            :  process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : 'skil'
});
pool.getConnection(function(err, connection) {
	if (err) throw err; // not connected!
	console.log("Connected!");
});

var SlackBot = require('slackbots');
const coaches = ["UQCGKUNAK", "UF47HSVPT", "UQEB1731P", "UQCSZPV1U", "UQAM223S9"];
const masters = ["UQCGKUNAK"];

// create a bot
var bot = new SlackBot({
	token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
	name: 'skilbot'
});

bot.on('start', () => {
  console.log("SKILbot to je beschikking")
});

//message Handler
bot.on('message', (message) => {
});



// Error Handler
bot.on('error', err => console.log(err));

// /commands
app.post('/issues', (req, res) => {
  console.log(req.body.text);
  console.log(req.body.user_id);
  pool.query("SELECT * FROM ISSUES ORDER BY ID ASC", function ISSUES(err, resultIssue) {
    if (err) throw err;
      for (var j = 0; j < resultIssue.length; j++) {
        var result = resultIssue[j].arrivalDate.toString();
        var datum = result.slice(15, 25);
        res.write(`\n ${resultIssue[j].naam}   Issue: ${resultIssue[j].issue}   Time: ${datum}   ID: ${resultIssue[j].ID} \n`);
      }
      res.end();
  });
});

app.post('/delete', (req, res) => {
  var Id = req.body.text;
  function deleteIssue() {
    var sql = 'DELETE FROM ISSUES WHERE ID  = ' + pool.escape(Id);
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
    res.send('deleted ' + results.affectedRows + ' rows');
    });
  }
  deleteIssue();
});

app.post('/add', (req, res) => {
  var Id = req.body.text;
  function insert() {
  	var sql = `INSERT INTO issues (naam, issue) VALUES ('Laurens', '${Id}')`;
    pool.query(sql, function (err, result) {
      if (err) throw err;
      res.send("1 record inserted");
    });
  }
  insert();
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

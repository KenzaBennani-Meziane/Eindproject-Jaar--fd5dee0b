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
const coaches = ["UQCGKUNAK", "UF47HSVPT", "UQEB1731P", "UQCSZPV1U", "UQAM223S9", "UFYU97CSU", "UTCT9JF4H"];
const masters = ["UQCGKUNAK"];

// Create a bot
var bot = new SlackBot({
	token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
	name: 'skilbot'
});

bot.on('start', () => {
  console.log("SKILbot to je beschikking")
});

// Message Handler
bot.on('message', (message) => {
});



// Error Handler
bot.on('error', err => console.log(err));

// Slash Commands
app.post('/issues', (req, res) => {
  console.log(req.body.text);
  console.log(req.body.user_name + " executed /issues");
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

app.post('/delete-issue', (req, res) => {
  var Text = req.body.text;
  var userName = req.body.user_name;
  console.log(req.body.user_name + " executed /delete-issue");
	if(coaches.includes(req.body.user_id)){
    function deleteIssue() {
      var sql = 'DELETE FROM ISSUES WHERE ID  = ' + pool.escape(Text);
      pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send('deleted ' + results.affectedRows + ' rows');
  	  });
    }
 }
 bot.postMessageToChannel(
   "_skillbot_test_public",
   `ISSUE SOLVED BY: ${userName}`
 );
 deleteIssue();
});

app.post('/add-issue', (req, res) => {
  var Text = req.body.text;
  var userName = req.body.user_name;
  console.log(req.body.user_name + " executed /add-issue");
  function insert() {
  	var sql = `INSERT INTO issues (naam, issue) VALUES ('${userName}', '${Text}')`;
    pool.query(sql, function (err, result) {
      if (err) throw err;
      res.send("1 record inserted");
    });
  }
  bot.postMessageToChannel(
    "_skillbot_test_public",
    `NEW ISSUE ADDED BY: ${userName}`
  );
  insert();
});

app.post('/skil-info', (req, res) => {
  console.log(req.body.user_name + " executed /skil-info");
    res.header('Content-Type', 'application/json');
    res.write(JSON.stringify({
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":slack: Hi, ik ben SKILbot!\nIk ben op dit platform gezet door drie studenten van de Bit Academy, maar dit gaat niet over mij, maar over wat ik kan.  \n \n Hier vind je een lijst van alle commands: \n*/skil-info* — _De command die je zojuist hebt gebruikt om dit te zien._ \n*/issues* — _Alle issues vertonen._ \n*/add* — _Een issue toevoegen in de queue._ \n*/delete* — _Een issue verwijderen van de queue._ \n\n\n\n\n\n\nVragen? Ik ben helaas _niet_ geprogammeerd die te beantwoorden, maar neem gerust contact op met *Iz-Dine*, *Kenza* of *Laurens*!"
            },
            "accessory": {
                "type": "image",
                "image_url": "https://avatars3.githubusercontent.com/u/53334549?s=280&v=4",
                "alt_text": "Let's code!"
            }
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "plain_text",
                    "text": " SKILbot© created by Iz-Dine, Kenza and Laurens.",
                    "emoji": true
                }
            ]
        }
    ]
}
    ));
    res.end();
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

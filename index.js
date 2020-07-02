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

// Slackbot
var bot = new SlackBot({
	token: process.env.SLACK_TOKEN,
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

// ---------------- Slash Commands ---------------- //
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

// Command: /add-issue - Toevoegen van een issue in de queue.
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
    "skilbot_test_channel",
    `NEW ISSUE ADDED BY: ${userName}`
  );
  insert();
});

// Command: /delete-issue - Verwijder een issue met het ID nummer.
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
    deleteIssue();
 } else {
   function deleteIssueStudent() {
     var sql = `DELETE FROM ISSUES WHERE naam  = ${pool.escape(userName)}`;
     pool.query(sql, function (error, results, fields) {
       if (error) throw error;
       res.send('deleted ' + results.affectedRows + ' rows');
    });
   }
   deleteIssueStudent();
 }
 bot.postMessageToChannel(
   "skilbot_test_channel",
   `ISSUE SOLVED BY: ${userName}`
 );
});

// Command: /skil-info - Informatie over de bot en een lijst met commands.
app.post('/skil-info', (req, res) => {
  console.log(req.body.user_name + " executed /skil-info");
    res.header('Content-Type', 'application/json');
    res.write(JSON.stringify({
      "blocks": [
           {
             "type": "section",
             "text": {
               "type": "mrkdwn",
               "text": ":slack: Hi, ik ben SKILbot!\nIk ben op deze workspace tot leven gekomen door drie studenten van de Bit Academy. Maar dit gaat natuurlijk niet over mij, maar over wat ik kan!  \n\n\n :clipboard: *Mijn Commands:* \n\n*/skil-info* — _De command die je zojuist hebt gebruikt om dit te zien._ \n*/issues* — _Alle issues vertonen._ \n*/add-issue* — _Een issue toevoegen in de queue._ \n*/delete-issue* — _Een issue verwijderen van de queue._ "
             }
           },
           {
             "type": "divider"
           },
           {
             "type": "section",
             "text": {
               "type": "mrkdwn",
               "text": ":question: Vragen? Ik ben helaas _niet_ geprogammeerd die te beantwoorden, maar neem gerust contact op met <@UQAM223S9>, <@UQCSZPV1U> of \n <@UQCGKUNAK>"
             },
               "type": "section",
               "text": {
                 "type": "mrkdwn",
                 "text": "Voor de BETA testers: \n Bedankt voor het meedoen aan de BETA van de SKILbot, jullie kunnen feedback geven in #_skillbot_test_public of in onze dm's."
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

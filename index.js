const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const token = process.env.SLACK_TOKEN;
const mysql = require('mysql');


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
	const params = {
		icon_emoji: ':robot:'
	};

	bot.postMessageToChannel(
		'skilbot_test_channel',
		'SKILbot tot je beschikking',
		params
	);
});

//message Handler
bot.on('message', (message) => {
	if (message.type == 'message') {
		console.log(message.user);
		console.log(`type van message.user is ${typeof message.user}`);

      if (coaches.includes(message.user)) {
        console.log('test coaches includes');
        issuesTies();
      } else {
      	console.log('error');
      }

			// if (masters.includes(message.user)) {
			// 	deleteIssue();
			// }
	}
});



// Error Handler
bot.on('error', err => console.log(err));

// /commands
app.post('/issues', (req, res) => {
    console.log('test post');
    res.header('Content-Type', 'application/json');
    pool.query("SELECT idIssue FROM coachIssue", function STUDENTS(err, resultCoach) {
      var counter = 0;
      console.log('test coach');
      for (var i = 0; i < resultCoach.length; i++) {
        console.log(`ID Coach lenght = ${resultCoach.length}`);
        var ID = resultCoach[i].idIssue;

        pool.query("SELECT * FROM ISSUES WHERE ID=" + ID, function STUDENTS(err, resultIssue) {
          if (err) throw err;
          console.log(i);

            for (var j = 0; j < resultIssue.length; j++) {
              console.log("test if i !== resultCoach.length -1");
              res.write(`\n ${resultIssue[j].naam}   Issue: ${resultIssue[j].issue}   Date: ${resultIssue[j].arrivalDate}   ID: ${resultIssue[j].ID} \n`);
            }
            counter = counter + 1;
            if (counter === i) {
              console.log("end");
              res.end();
            }
        });
      }
    });
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// function deleteIssue(message) {
// 	console.log(message);
// 	var Id = message;
// 	var sql   = 'DELETE FROM coachIssue WHERE idIssue  = ' + connection.escape(Id);
// 	pool.query(sql, function (error, results, fields) {
// 	  if (error) throw error;
// 	console.log('deleted ' + results.affectedRows + ' rows');
// 	});
// }
//
//
// function insert(message) {
// 	var sql = `INSERT INTO issues (naam, issue) VALUES (${message}, ${message})`;
//   pool.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// }

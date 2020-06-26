require('dotenv').config();
const token = process.env.SLACK_TOKEN;
const mysql = require('mysql');

var connection = mysql.createConnection({
	host: "skil1.mysql.database.azure.com",
	database: 'skil',
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});


connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

var SlackBot = require('slackbots');
const coaches = ["UF47HSVPT", "UQEB1731P", "UQCSZPV1U", "UQAM223S9"];
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

			if (masters.includes(message.user)) {
				deleteIssue();
			}
	}
});



// Error Handler
bot.on('error', err => console.log(err));


//functions
function issuesTies() {
	console.log('begin functie issuesTies()');
	connection.query("SELECT idIssue FROM coachIssue", function STUDENTS(err, resultTies) {
		for (var i = 0; i < resultTies.length; i++) {
			console.log(`index: ${resultTies[i].idIssue} in de for loop`);
			var ID = resultTies[i].idIssue;

			connection.query("SELECT * FROM ISSUES WHERE ID=" + ID, function STUDENTS(err, resultIssue) {
				if (err) throw err;

				for (var j = 0; j < resultIssue.length; j++) {
					bot.postMessageToChannel(
						'skilbot_test_channel',
						`Naam: (${resultIssue[j].naam})   Issue: (${resultIssue[j].issue})   Date: (${resultIssue[j].arrivalDate})   ID: (${resultIssue[j].ID})`
					);
				}
			});
		}
	});
}

function deleteIssue(message) {
	console.log(message);
	var Id = message;
	var sql   = 'DELETE FROM coachIssue WHERE idIssue  = ' + connection.escape(Id);
	connection.query(sql, function (error, results, fields) {
	  if (error) throw error;
	console.log('deleted ' + results.affectedRows + ' rows');
	});
}


function insert(message) {
	var sql = `INSERT INTO issues (naam, issue) VALUES (${message}, ${message})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

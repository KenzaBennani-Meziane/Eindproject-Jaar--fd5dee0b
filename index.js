//Required for the bot
require('dotenv').config();
const token = process.env.SLACK_TOKEN;
const mysql = require('mysql');
var SlackBot = require('slackbots');

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


const coaches = ["UQCGKUNAK", "UF47HSVPT", "UQEB1731P", "UQCSZPV1U", "UQAM223S9"];

// Create a bot
var bot = new SlackBot({
	token: process.env.SLACK_TOKEN, 
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

bot.on('message', (message) => {
	if (message.type == 'message') {
		console.log(message.user);
		console.log(`type van message.user is ${typeof message.user}`);

      if (coaches.includes(message.user)) {
        console.log('test coaches includes');
        issuesTies();
      }
	}
});



// Error Handler
bot.on('error', err => console.log(err));


//functions
function issuesTies() {
	console.log('begin functie issuesTies()');
	connection.query("SELECT idIssue FROM coachIssue WHERE idCoach=1", function STUDENTS(err, resultTies) {
		for (var i = 0; i < resultTies.length; i++) {
			console.log(`index: ${resultTies[i].idIssue} in de for loop`);
			var ID = resultTies[i].idIssue;

			connection.query("SELECT * FROM ISSUES WHERE ID=" + ID, function STUDENTS(err, resultIssue) {
				if (err) throw err;

				for (var j = 0; j < resultIssue.length; j++) {
					bot.postMessageToChannel(
						'skilbot_test_channel',
						resultIssue[j]
					);
				}
			});
		}
	});
}

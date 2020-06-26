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

app.post('/blabla', (req, res) => {
    console.warn (req);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "blocks": [
        		{
        			"type": "section",
        			"text": {
        				"type": "mrkdwn",
        				"text": "Hello World!"
        			}
        		}
        	]
        }
    ));
})

app.post('/issues', (req, res) => {
    console.warn (req);
    console.log('test post');
    pool.query("SELECT idIssue FROM coachIssue", function STUDENTS(err, resultCoach) {
      console.log('test coach');
      for (var i = 0; i < resultCoach.length; i++) {

        console.log('test for coach');
        var ID = resultCoach[i].idIssue;

        pool.query("SELECT * FROM ISSUES WHERE ID=" + ID, function STUDENTS(err, resultIssue) {
          if (err) throw err;
            for (var j = 0; j < resultIssue.length; j++) {
              console.log('test for issue');
              res.send( `${resultIssue[j].naam}   Issue: ${resultIssue[j].issue}   Date: ${resultIssue[j].arrivalDate}   ID: ${resultIssue[j].ID}`);
          }
        }
       );
      }
    });
  });


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

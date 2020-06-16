var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  database: 'scrum',
  user:  "root",
  password: ''
});



app.listen('3000', () => {
  console.log();
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

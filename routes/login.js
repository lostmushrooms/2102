var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const user = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '********',
  port: 5432,
})

var sql_query = "SELECT * FROM Users WHERE username = '";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page', message: '' });
});

router.post('/', function(req, res, next) {
	var username    = req.body.username;
	var password = req.body.password;


	if (username.length == 0 || password.length == 0) {
		res.render('login', { title: 'Login Page', message: '' });
		return;
	}
	
	// Construct Specific SQL Query
	var select_query = sql_query + username + "'";
	
	user.query(select_query, (err, data) => {
		if (data.rows.length){
			var row = data.rows;
			console.log(row);
			console.log(row[0].password);
			console.log(password);
			if (row[0].password == password) {
				console.log("correct");
				req.session.username = username;
				req.session.user = data[0];
				res.redirect("/dashboard");
				return;
			}
		}
		res.render('login', { title: 'Login Page', message: 'Wrong Credentials' })
	});
});

module.exports = router;

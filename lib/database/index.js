var mysql = require('mysql');

var connection =  mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : 'ncee_web'
});

connection.on('error', function(err) {
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
    console.log("FYI: The database connection was closed.");
  } else {
    throw err;
  }
});

module.exports = connection;
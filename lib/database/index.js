var mysql = require('mysql');

var connection =  mysql.createConnection({
  host     : '204.232.233.146',
  user     : 'skinney',
  password : '2SKvedBhQx9Q2',
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
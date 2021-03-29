const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.db);

connection.connect((error) => {
    if (error) throw error;
    connection.query("CREATE DATABASE IF NOT EXISTS " + config.dbName + ";", function (error) {
        if (error) throw error;
    });
    connection.query('USE ' + config.dbName + ';', (error) => {
        if (error) throw error;
    });
    connection.query(`
        CREATE TABLE IF NOT EXISTS \`votes\` (
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
          value int(2) NOT NULL,
          timestamp TIMESTAMP NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `,
        (error) => {
            if (error) throw error;
        }
    );
    console.log('Connected to the database...');
});

module.exports = connection;

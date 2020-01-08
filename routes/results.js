var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET results page. */
router.get('/results', function(req, res, next) {
    /*Log in information for database*/
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'un1wkfhlzh0kr6r7',
        password: 'rwn4e9l1zhi8x4xb',
        database: 'gmgzigxgy9482pn6',
    });

    connection.connect();

//Populates our drop down option with data from a data base
    var sqlQuery = `SELECT ingredientName FROM fp_ingredient ORDER BY ingredientName ASC`
    connection.query(sqlQuery,
        function(error, results, fields) {
            if (error) throw error;

            res.render('results', {
                ingredientName: results
            });

        });

    connection.end();

});



module.exports = router;

var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    /*Log in information for database*/
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'un1wkfhlzh0kr6r7',
        password: 'rwn4e9l1zhi8x4xb',
        database: 'gmgzigxgy9482pn6',
    });

    connection.connect();

//Populates our drop down option with data from a data base
    var sqlQuery = `SELECT ingredientName FROM fp_ingredient ORDER BY ingredientName ASC`;
    connection.query(sqlQuery,
        function(error, results, fields) {
            if (error) throw error;

            res.render('index', {
                ingredientName: results
            });

        });
    connection.end();
});

router.post('/averageIngredients', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'un1wkfhlzh0kr6r7',
        password: 'rwn4e9l1zhi8x4xb',
        database: 'gmgzigxgy9482pn6',
    });

    connection.connect();
    var sqlQuery = `SELECT AVG(ingredientCount) as averageIngredients
                    FROM 
                    (SELECT COUNT(ri.ingredientId) as ingredientCount, r.recipeName
                    FROM fp_recipeIngredient ri
                    INNER JOIN fp_recipe r ON r.recipeId = ri.recipeId
                    GROUP BY r.recipeId) as averageIngredientCount`;
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        res.json({
            averageIngredients: results
        });
    });
    connection.end();
});

router.post('/ingredientCount', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'un1wkfhlzh0kr6r7',
        password: 'rwn4e9l1zhi8x4xb',
        database: 'gmgzigxgy9482pn6',
    });

    connection.connect();
    var sqlQuery = `SELECT r.recipeName, COUNT(ri.ingredientId) as ingredientCount
                    FROM fp_ingredient i
                    LEFT OUTER JOIN fp_recipeIngredient ri ON i.ingredientId = ri.ingredientId
                    RIGHT OUTER JOIN fp_recipe r ON ri.recipeId = r.recipeId
                    GROUP BY ri.recipeId
                    ORDER BY r.recipeName`;
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        res.json({
            ingredientCountPerRecipe: results
        });
    });
    connection.end();
});

router.post('/totalNumberRecipes', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'un1wkfhlzh0kr6r7',
        password: 'rwn4e9l1zhi8x4xb',
        database: 'gmgzigxgy9482pn6',
    });

    connection.connect();
    var sqlQuery = `SELECT COUNT(r.recipeId) as totalNumberOfRecipes
                    FROM fp_recipe r`;
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        res.json({
            ingredientCount: results
        });
    });
    connection.end();
});

module.exports = router;

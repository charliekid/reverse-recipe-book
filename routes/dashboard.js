var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session && req.session.username && req.session.username.length) {
        let query = 'SELECT DISTINCT * FROM fp_ingredient';

        db.query(query, (err, result) => {
            if (err) {
                res.render('layouts/error');
            }
            console.log();
            res.render('dashboard', {
                title: 'Ingredient List',
                ingredients: result
            });
        });
    } else {
        delete req.session.username;
        res.redirect('/auth/login');
    }
});
router.get('/add', function(req,res, next) {
    res.render('add-ingredients', {
        title: 'Add Ingredient'
    });
});

router.post('/add', function(req, res, next) {
    let ingredientName = req.body.ingredient_name;
    let query = "INSERT INTO `fp_ingredient` (ingredientName) VALUES ('" + ingredientName + "')";


    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/dashboard');
    });
});
router.get('/edit/:id',function (req,res,next) {
    let ingredientId = req.params.id;
    let query = "SELECT DISTINCT * FROM `fp_ingredient` WHERE ingredientId = '" + ingredientId + "'"; 
    
     db.query(query, (err, result) => {
        if(err) {
            res.render('/error');
        }
        console.log();
        res.render('edit-ingredient', {
            title: 'Ingredient List',
            ingredients: result
        });
    });
    
});

router.post('/edit/:id',function (req,res,next) {
    // res.send("we are in the post");
    let ingredientId = req.params.id;
    let ingredientName = req.body.ingredient_name;
    let query = "UPDATE `fp_ingredient` SET `ingredientName` ='" + ingredientName +  "' WHERE `ingredientId` = '" + ingredientId + "'"; 
    console.log("inside of post /edit/id", ingredientName);
     db.query(query, (err, result) => {
        if(err) {
            res.render('/error');
        }
        console.log();
        res.redirect('/dashboard');
    });
    
});

router.get('/delete/:id',function (req,res,next) {
    let ingredientId = req.params.id;
    let query = "SELECT DISTINCT * FROM `fp_ingredient` WHERE ingredientId = '" + ingredientId + "'";

    db.query(query, (err, result) => {
        if(err) {
            res.render('/error');
        }
        console.log();
        res.render('delete-ingredient', {
            title: 'Ingredient List',
            ingredients: result
        });
    });

});

router.post('/delete/:id',function (req,res,next) {
    // res.send("we are in the post");
    let ingredientId = req.params.id;
    let ingredientName = req.body.ingredient_name;
    let query = "DELETE FROM `fp_ingredient` WHERE ingredientId = '" + ingredientId + "'";
    console.log("inside of post /delete/id");
    db.query(query, (err, result) => {
        if(err) {
            res.render('/error');
        }
        console.log();
        res.redirect('/dashboard');
    });
});

router.get('/name/',function (req,res,next) {
    let ingredientName = req.params.id;
    let ingredientId= req.params.id;
    let query = "SELECT DISTINCT * FROM `fp_ingredient` WHERE ingredientId = '" + ingredientName + "'";

    db.query(query, (err, result) => {
        if(err) {
            res.render('layouts/error');
        }
        console.log();
        res.render('filter-name', {
            title: 'Ingredient List',
            ingredients: result
        });
    });

});

router.post('/name/',function (req,res,next) {
    // post
    let ingredientName = req.body.ingredient_name;
    console.log('ingredientName: ', ingredientName);
    let query = "Select DISTINCT i.ingredientId, i.ingredientName FROM `fp_ingredient` i WHERE i.ingredientName = '"+ingredientName+"'";
    console.log('query:', query)
    db.query(query, (err, result) => {

        if(err) {
            res.render('/error');
        }
        console.log("result", result);
        res.render('filter-name',{
            title: 'Ingredient List',
            ingredients: result
        });
    });
});


router.get('/id/',function (req,res,next) {
    let ingredientName = req.params.id;
    let ingredientId= req.params.id;
    let query = "SELECT DISTINCT * FROM `fp_ingredient` WHERE ingredientName = '" + ingredientId + "'";

    db.query(query, (err, result) => {
        if(err) {
            res.render('layouts/error');
        }
        console.log();
        res.render('filter-id', {
            title: 'Ingredient List',
            ingredients: result
        });
    });

});

router.post('/id/',function (req,res,next) {
    // post
    let ingredientId = req.body.ingredient_Id;
    let ingredientName = req.params.id;
 
    let query = "SELECT i.ingredientId, i.ingredientName FROM `fp_ingredient` i WHERE i.ingredientId = '"+ingredientId+"'";
     console.log ('query:', query);
    db.query(query, (err, result) => {
console.log("result",result);
        if(err) {
            res.render('/error');
        }
        else {
        res.render('filter-id',{
            title: 'Ingredient List',
            ingredients: result
        });
        }

    });
});

router.get('/recipe/',function (req,res,next) {
    res.render('filter-recipe', {
            title: 'Ingredient List',
        });
    // let ingredientName = req.params.id;
    // let ingredientId= req.params.id;
    // let query = "SELECT DISTINCT * FROM `fp_ingredient` WHERE ingredientName = '" + ingredientId + "'";

    // db.query(query, (err, result) => {
    //     if(err) {
    //         res.render('layouts/error');
    //     }
    //     console.log();
    //     res.render('filter-recipe', {
    //         title: 'Ingredient List',
    //         ingredients: result
    //     });
    // });

});

router.post('/recipe/',function (req,res,next) {
    // post
    let recipeName = req.body.recipe_name;
 
    let query = "SELECT i.ingredientName FROM fp_ingredient i INNER JOIN fp_recipeIngredient ri ON i.ingredientId = ri.ingredientId INNER JOIN fp_recipe r ON ri.recipeId = r.recipeId WHERE recipeName = '"+ recipeName+ "'";
     console.log ('query:', query);
    db.query(query, (err, result) => {
console.log("result",result);
        if(err) {
            res.render('/error');
        }
        else {
        res.render('filter-recipe',{
            title: 'Ingredient List',
            ingredients: result
        });
        }

    });
});









module.exports = router;
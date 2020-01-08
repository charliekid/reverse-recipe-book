var express = require('express');
var router = express.Router();
//const mysql = require('mysql');
const session = require('express-session');

/* GET home page. */
router.get('/admin', function(req, res, next) {
    // res.render('../views/dashboard', {
    //     title: 'Logged in Dashboard' });
    console.log('what is the session id?', req.cookies['connect.sid']);
    // console.log('what is jason?', req.cookies['jason']);

    console.log('session username', req.session.username);

    if (req.session && req.session.username && req.session.username.length) {
        res.render('../views/admin', {
            title: 'Dashboard',
            username: req.session.username
        });
    }
    else {
        delete req.session.username;
        res.redirect('/auth/login');
    }
});

router.get('/logout', function(req, res, next) {

    if (req.session && req.session.username && req.session.username.length) {
        delete req.session.username;
    }

    res.json({
        successful: true,
        message: ''
    });

});

router.get('/login', function(req, res, next) {
    res.render('../views/login', {
        title: 'Login' });
});

router.post('/login', function(req, res, next) {

    let successful = false;
    let message = '';

    if (req.body.username === 'admin' && req.body.password === 'password') {
        successful = true;
        req.session.username = req.body.username;
        // req.cookie('jason', 'the great!', { maxAge: 900000, httpOnly: true });
    }
    else {
        // delete the user as punishment!
        delete req.session.username;
        message = 'Wrong username or password!'
    }

    console.log('session username', req.session.username);

    // console.log('res.body', req.body);

    // Return success or failure
    res.json({
        successful: successful,
        message: message
    });
});
router.get('/logout', function(req, res, next) {

    if (req.session && req.session.username && req.session.username.length) {
        delete req.session.username;
    }

    res.json({
        successful: true,
        message: ''
    });

});

module.exports = router;
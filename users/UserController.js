var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.json());

var User = require('./User')

router.get('/all', function (req, res){
    User.getAllUser(function (err, user) {
        if(err) {
            return res.status(500).send({ error: 'Something failed' });
        } else {
            return res.status(200).send(user);
        }
    });
}); 

router.post('/login', function (req, res){
    var pseudo = req.body.pseudo;
    var mdp = req.body.mdp;
    User.logUser(pseudo, mdp, function (err, results) {
        if(err) {
            res.status(500).send({ error: 'Something failed' });
        } else {
            res.status(200).send(results);
        }
    });
}); 

router.post('/', function(req, res) {
    var pseudo = req.body.pseudo;
    var mdp = req.body.mdp;
    var avatar = req.body.avatar;
    var role = req.body.role;
    User.createUser(pseudo, mdp, avatar, role , function (err, user) {
        if(err) {
            return res.status(500).send({ error: 'Something failed' });
        } else {
            return res.json(user);
        }
    });
});

router.get('/:pseudo', function (req, res) {
    User.getUserByPseudo(req.params.pseudo, function (err, result) {
        if(err) {
            return res.status(500).send({ error: 'Something failed'});
        } else {
            return res.status(200).send(result);
        }
    })
})

module.exports = router;


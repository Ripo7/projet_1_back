var db = require('../db');

var User = function (user) {
    this.id = user.id;
    this.pseudo = user.pseudo;
    this.mdp = user.mdp;
    this.avatar = user.avatar;
    this.role = user.role;
}

User.createUser = function (pseudo, mdp, avatar, role, result) {
    db.query('INSERT INTO users set ?', { pseudo, mdp, avatar, role }, function (err, res) {
        if(err){
            console.log('error', err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

User.getAllUser = function (result) {
    db.query('SELECT * FROM users', function (err, res){
        if(err){
            console.log('error', err);
            result(err,null);
        } else {
            result(null, res);
        }
    });
}

User.getUserByPseudo = function (pseudo, result) {
    db.query(`SELECT * FROM users WHERE pseudo = '${pseudo}'`, function (err, res){
        if(err){
            console.log('error', err);
            result(err,null);
        } else {
            result(null, res);
        }
    });
}

User.logUser = function (userPseudo, userMdp, result){
    db.query(`SELECT * FROM users WHERE pseudo = '${userPseudo}' AND mdp = '${userMdp}'`, function (err, res){
        if(err) {
            console.log('error', err);
            result(err, null) 
        } else {
            result(null, res)
        }
    });
}

module.exports = User;
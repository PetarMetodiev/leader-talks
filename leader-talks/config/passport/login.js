var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');

var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email',     // change the username field in passport to be called email
        passReqToCallback: true     // the req object is allowed to be used in the callback(the second parameter of new LocalStrategy())
    }, function(req, email, password, done) {
        User.findOne({
            'email': email
        }, function(err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            
            if (!user) {
                console.log('No user with email ' + email + ' found.');
                return done(null, false, req.flash('message', 'User not found'));
            }
            
            if (!isValidPassword(user, password)) {
                console.log('Invalid password: ' + email);
                return done(null, false, req.flash('message', 'Invalid password'));
            }
            
            return done(null, user);
        })
    }));
}
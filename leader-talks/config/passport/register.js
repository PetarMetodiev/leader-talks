var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

var minPasswordLength = 6;

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

module.exports = function(passport) {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({
                'email': email
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    console.log('In user: ' + email);
                    return done(err);
                }

                if (!validator.isEmail(email)) {
                    console.log('Invalid email: ' + email);
                    return done(null, false, req.flash('message', 'Invalid email'));
                }

                if(req.body.password.length < minPasswordLength){
                    console.log('Short password: ' + email);
                    return done(null, false, req.flash('message', 'Password must be at least 6 characters long'));
                }

                if (req.body.password !== req.body.passwordRepeat) {
                    console.log('Not matching passwords in user: ' + email);
                    return done(null, false, req.flash('message', 'Passwords did not match.'));
                }

                if (user) {
                    console.log('User already exists: ' + email);
                    return done(null, false, req.flash('message', 'User already exists.'));
                }

                else {
                    var newUser = new User();
                    newUser.email = req.body.email;
                    newUser.password = createHash(password);

                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error saving user: ' + err);
                            console.log('User: ' + email);
                            throw err;
                        }

                        console.log('User registered successfully: ' + email);
                        return done(null, newUser);
                    })
                }
            })
        });

    }));
}
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

module.exports = function(passport) {
    passport.use('register', new LocalStrategy({
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

                if (user) {
                    console.log('User already exists: ' + email);
                    return done(null, false, req.flash('message', 'User already exists.'));
                }

                if (req.body.password !== req.body.passwordRepeat) {
                    console.log('Not matching passwords in user: ' + email);
                    return done(null, false, req.flash('message', 'Passwords do not match.'));
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

                        console.log('User registered successfully: ' + user);
                        return done(null, newUser);
                    })
                }
            })
        });

    }));
}
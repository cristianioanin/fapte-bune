require('dotenv').config();

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
  User.findOne({ _id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      User.isValidPassword(password, user.password, (err, isMatch) => {
        if (err) {
          throw new Error(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    } else {
      return done(null, false);
    }
  });
}));
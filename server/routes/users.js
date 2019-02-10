require('dotenv').config();

const router = require('express').Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../config/passport-setup');
const User = require('../models/User');

const { validateBody, schemas } = require('../helpers/routesHelpers');

const signJWTToken = (user) => {
  return JWT.sign({
    iss: 'fapte-bune',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
}

router.post('/register', validateBody(schemas.registrationSchema), (req, res) => {
  const { username, password, email } = req.value.body;

  User.findOne({ email }).then(userRecord => {
    if (userRecord) {
      return res.status(403).json({
        error: 'Email is already in use'
      });
    } else {
      const newUser = new User({ username, password, email });

      User.createUser(newUser, (err, user) => {
        if (err) {
          res.status(400).json(err);
        } else {
          const token = signJWTToken(user);
          res.status(201).json({ token });
        }
      });
    }
  });
});

router.post('/login', validateBody(schemas.authenticationSchema), passport.authenticate('local', { session: false }), (req, res) => {
  const token = signJWTToken(req.user);
  res.status(200).json({ token });
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.isAdmin) {
    User.find({}, (err, users) => {
      if (err) {
        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).json(users);
      }
    });
  } else {
    res.status(403).json({
      error: 'You do not have permission to access this resource'
    });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.isAdmin) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        res.status(400).json({
          error: err
        });
      } else {
        res.status(202).json(user);
      }
    });
  } else {
    res.status(403).json({
      error: 'You do not have permission to access this resource'
    });
  }
});

module.exports = router;
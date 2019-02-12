require('dotenv').config();
require('../config/passport-setup');

const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

const { validateBody, schemas, signJWTToken } = require('../helpers/routesHelpers');

// REGISTER Route
router.post('/register', validateBody(schemas.registrationSchema), (req, res) => {
  const { username, password, email, avatar } = req.value.body;

  User.findOne({ 'local.email': email }).then(userRecord => {
    if (userRecord) {
      return res.status(403).json({
        error: 'Email is already in use'
      });
    } else {
      const newUser = new User({
        authMethod: 'local',
        local: {
          username,
          password,
          email,
          avatar
        }
      });

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

// LOGIN Route
router.post('/login', validateBody(schemas.authenticationSchema), passport.authenticate('local', { session: false }), (req, res) => {
  const token = signJWTToken(req.user);
  res.status(200).json({ token });
});

// SOCIAL Login Routes
router.post('/auth/google', passport.authenticate('googleToken', { session: false }), (req, res) => {
  const token = signJWTToken(req.user);
  res.status(200).json({ token });
});

router.post('/auth/facebook', passport.authenticate('facebookToken', { session: false }), (req, res) => {
  const token = signJWTToken(req.user);
  res.status(200).json({ token });
});

// INDEX Route
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

// SHOW Route
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.isAdmin) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(400).json({
          error: err.message
        });
      } else {
        res.status(200).json(user);
      }
    });
  } else {
    res.status(403).json({
      error: 'You do not have permission to access this resource'
    });
  }
});

// UPDATE Route
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.isAdmin) {
    const { username, email, avatar } = req.body;

    User.findById(req.params.id, (err, userRecord) => {
      const authMethod = userRecord.authMethod;
      User.findByIdAndUpdate(req.params.id, {
        [authMethod]: {
          username,
          email,
          avatar
        }
      }, (err, updatedRecord) => {
        if (err) {
          res.status(400).json({
            error: err.message
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Resource updated'
          });
        }
      });
    });
  } else {
    res.status(403).json({
      error: 'You do not have permission to access this resource'
    });
  }
});

// DELETE Route
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.isAdmin) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        res.status(400).json({
          error: err.message
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
require('dotenv').config();

const JWT = require('jsonwebtoken');
const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    registrationSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      avatar: Joi.string(),
      password: Joi.string().required(),
      passwordConfirm: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    }),
    authenticationSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },

  signJWTToken: (user) => {
    return JWT.sign({
      iss: 'fapte-bune',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET);
  }
}
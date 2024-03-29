const express = require('express');
const { param, body } = require('express-validator');
const {
  validationMiddleware,
  scopeCheckMiddleware,
  authCheckMiddleware,
} = require('@microservices-inc/common');
const { profileController } = require('../controllers');

const profileRouter = express.Router();

profileRouter.get(
  '/me',
  authCheckMiddleware,
  scopeCheckMiddleware('profile:me:read'),
  profileController.me,
);
profileRouter.delete(
  '/:id',
  [
    param('id')
      .isUUID()
      .withMessage('Param id should be uuid'),
  ],
  authCheckMiddleware,
  scopeCheckMiddleware('profile:delete'),
  validationMiddleware,
  profileController.deleteProfile,
);
profileRouter.get(
  '/:userId',
  [
    param('userId')
      .isUUID()
      .withMessage('Param userId should be uuid'),
  ],
  authCheckMiddleware,
  scopeCheckMiddleware('profile:read'),
  validationMiddleware,
  profileController.getProfile,
);

profileRouter.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Password must be between 4 and 10 symbols'),
  ],
  validationMiddleware,
  profileController.login,
);

profileRouter.post('/logout', profileController.logout);

module.exports = profileRouter;

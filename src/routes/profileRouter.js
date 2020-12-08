const express = require('express');
const { param } = require('express-validator');
const { profileController } = require('../controllers');
const { authCheckMiddleware } = require('../middlewares');
const { validationMiddleware } = require('../middlewares');

const profileRouter = express.Router();

profileRouter.get('/me', authCheckMiddleware, profileController.me);
profileRouter.delete(
  '/:id',
  [param('id').isUUID().withMessage('Param id should be uuid')],
  authCheckMiddleware,
  validationMiddleware,
  profileController.deleteProfile,
);
profileRouter.get(
  '/:userId',
  [param('userId').isUUID().withMessage('Param userId should be uuid')],
  authCheckMiddleware,
  validationMiddleware,
  profileController.getProfile,
);

module.exports = profileRouter;

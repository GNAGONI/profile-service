const express = require('express');
const { param } = require('express-validator');
const { profileController } = require('../controllers');
const { authCheckMiddleware } = require('../middlewares');

const profileRouter = express.Router();

profileRouter.get('/me', authCheckMiddleware, profileController.me);
profileRouter.delete(
  '/delete/:id',
  [param('id').isUUID().withMessage('Query param id should be uuid')],
  authCheckMiddleware,
  profileController.deleteProfile,
);

module.exports = profileRouter;

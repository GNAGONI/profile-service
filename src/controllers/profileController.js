const jwt = require('jsonwebtoken');
const { dbQueryError, passwordUtil } = require('@microservices-inc/common');
const { eventBus } = require('@microservices-inc/common');
const { dbQuery } = require('../db');

const me = async (req, res) => {
  const { id } = req.user;
  const result = await dbQuery(`SELECT * FROM get_profile_by_id('${id}');`);
  const profile = result.rows[0];
  res.send({
    id: profile.id,
    name: profile.name,
    details: profile.details,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  });
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  const result = await dbQuery(`SELECT * FROM delete_profile_by_id('${id}');`);
  const deletedProfile = result.rows[0];
  res.send({
    id: deletedProfile.id,
    name: deletedProfile.name,
    details: deletedProfile.details,
    createdAt: deletedProfile.created_at,
    updatedAt: deletedProfile.updated_at,
  });
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const result = await dbQuery(`SELECT * FROM get_profile_by_id('${userId}');`);
  const profile = result.rows[0];
  res.send({
    id: profile.id,
    name: profile.name,
    details: profile.details,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await dbQuery(
    `SELECT * FROM get_profile_by_email('${email}');`,
  );
  const user = result.rows[0];
  if (!passwordUtil.compareHash(password, user.password_hash)) {
    throw dbQueryError('Invalid credentials');
  }
  req.session.userEmail = user.email;
  req.session.userId = user.id;
  req.session.authenticated = true;
  res.send({
    credentials: user.user_type_credentials,
  });
};

const logout = (req, res) => {
  const { userEmail, userId } = req.session;
  if (userEmail && userId) {
    const publisher = eventBus.getPublisher('isOnline');
    if (publisher) {
      publisher.publish({
        userEmail,
        userId,
        isOnline: false,
      });
    } else {
      console.error('Publisher to event bus is not provided');
    }
  } else {
    console.error('Invalid session data. Email or id is not provided');
  }
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
  });

  res.sendStatus(200);
};

module.exports = {
  me,
  deleteProfile,
  getProfile,
  login,
  logout,
};

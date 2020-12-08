const { dbQueryError } = require('../errors');
const { client } = require('../db');

const me = async (req, res) => {
  const { id } = req.user;
  const result = await client.query(
    `SELECT * FROM get_profile_by_id('${id}');`,
  );
  const profile = result.rows[0];
  if (!profile) {
    throw dbQueryError('Profile does not exist');
  }
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
  const result = await client.query(
    `SELECT * FROM delete_profile_by_id('${id}');`,
  );
  const deletedProfile = result.rows[0];
  if (!deletedProfile) {
    throw dbQueryError('Profile does not exist');
  }
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
  const result = await client.query(
    `SELECT * FROM get_profile_by_id('${userId}');`,
  );
  const profile = result.rows[0];
  if (!profile) {
    throw dbQueryError('Profile does not exist');
  }
  res.send({
    id: profile.id,
    name: profile.name,
    details: profile.details,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  });
};

module.exports = {
  me,
  deleteProfile,
  getProfile,
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    public_id: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    password_hash: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  User.associate = models => {
    // associations can be defined here
  };
  return User;
};

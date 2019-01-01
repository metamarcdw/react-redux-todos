'use strict';
const uuid = require('uuid/v4');
const models = require('../models');

// sequelize: cannot seed association values in DB table
// https://stackoverflow.com/a/52234460/10174512

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        public_id: uuid(),
        name: 'Snoop',
        password_hash: 'password',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        public_id: uuid(),
        name: 'Scooby',
        password_hash: 'password',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        public_id: uuid(),
        name: 'Herbie',
        password_hash: 'password',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const user = await models.User.findOne({
      where: { admin: true }
    });

    const result = await queryInterface.bulkInsert('Todos', [
      {
        text: 'Do a thing',
        complete: true,
        user_id: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        text: 'Do another thing',
        complete: false,
        user_id: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    return result;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Todo.associate = models => {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};

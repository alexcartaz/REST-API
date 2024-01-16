"use strict";

/**
 * Define a database model to be exported, with tables names, data types, and validation
 *
 * @param {promise-based ORM (object relational mapping) tool} sequelize
 * @param {Define type of data for sequelize} DataTypes
 * @returns table named Book to store data
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fisrtName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please provide a value for firstName",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please provide a value for lastName",
          },
        },
      },
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );

  User.associate = (models) => {
    User.hasMany(models.Course);
  }

  return User;
};
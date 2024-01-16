"use strict";

/**
 * Define a database model to be exported, with tables names, data types, and validation
 *
 * @param {promise-based ORM (object relational mapping) tool} sequelize
 * @param {Define type of data for sequelize} DataTypes
 * @returns table named Book to store data
 */

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please provide a value for title",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Please provide a value for description",
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  ); 

  Course.associate = (models) => {
    Course.belongsTo(models.User);
  }

  return Course;
};
"use strict";

const { DataTypes } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      adminRole: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: "username",
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workplace: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profileImage: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      profileDesc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};

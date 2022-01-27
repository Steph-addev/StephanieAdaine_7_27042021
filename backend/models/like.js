"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, UserId: undefined, PostId: undefined };
    }
  }
  Like.init(
    {
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
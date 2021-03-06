"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "cascade",
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "cascade",
      });
    }
    /*     toJSON() {
      return { ...this.get(), id: undefined, UserId: undefined, PostId: undefined };
    } */
  }
  Comment.init(
    {
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      content: DataTypes.STRING,
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

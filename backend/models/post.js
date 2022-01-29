"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
    /*     toJSON() {
      return { ...this.get(), id: undefined, UserId: undefined };
    } */
  }
  Post.init(
    {
      UserId: DataTypes.INTEGER,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      images: DataTypes.STRING,
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

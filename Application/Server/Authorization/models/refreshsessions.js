const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('refreshsessions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ua: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fingerprint: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'refreshsessions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refreshsessions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

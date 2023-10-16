const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('photo', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'photo',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "photo_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
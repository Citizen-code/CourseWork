const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('engine', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'engine',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "engine_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
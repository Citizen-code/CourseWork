const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('status_order', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'status_order',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "status_order_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
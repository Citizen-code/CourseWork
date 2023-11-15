const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('service_price', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  is_time_based: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'service_price',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "service_price_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('service', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  date_add: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_DATE')
  },
  price_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'service_price',
      key: 'id'
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  }
}, {
  sequelize,
  tableName: 'service',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "service_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('list_services', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'order',
      key: 'id'
    }
  },
  service_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'service',
      key: 'id'
    }
  },
  time: {
    type: DataTypes.DECIMAL,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'list_services',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "list_services_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
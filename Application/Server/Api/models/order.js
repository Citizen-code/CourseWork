const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'client',
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'employee',
      key: 'id'
    }
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'status_order',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'order',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "order_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
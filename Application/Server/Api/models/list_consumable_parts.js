const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('list_consumable_parts', {
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
  consumable_part_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'consumable_part',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'list_consumable_parts',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "list_consumable_parts_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('consumable_part', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  article: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  prise: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  measure_unit: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  photo_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'photo',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'consumable_part',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "consumable_part_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
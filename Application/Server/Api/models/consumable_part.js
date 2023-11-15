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
  price: {
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
  },
  date_add: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: sequelize.Sequelize.literal('CURRENT_DATE')
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
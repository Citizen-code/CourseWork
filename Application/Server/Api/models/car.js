const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('car', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'client',
      key: 'id'
    },
    unique: "car_client_id_key"
  },
  number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mileage: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  vin: {
    type: DataTypes.STRING(17),
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  engine_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'engine',
      key: 'id'
    }
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
  tableName: 'car',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "car_client_id_key",
      unique: true,
      fields: [
        { name: "client_id" },
      ]
    },
    {
      name: "car_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
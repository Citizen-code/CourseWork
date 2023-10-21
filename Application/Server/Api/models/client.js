const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('client', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  surname: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'client',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "client_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
const {sequelize, DataTypes} = require('./index');

module.exports = sequelize.define('authorization_employee', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'authorization_employee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "authorization_employee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('refresh_session_employee', {
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
    refreshToken: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'refresh_session_employee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refresh_session_employee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
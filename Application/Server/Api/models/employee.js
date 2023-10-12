const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('employee', {
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
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'photo',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('authorization_client', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_activated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'authorization_client',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "authorization_client_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

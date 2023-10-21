const {sequelize,DataTypes} = require('./index');

module.exports = sequelize.define('refresh_session_client', {
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
      }
    },
    refreshToken: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'refresh_session_client',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refresh_session_client_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
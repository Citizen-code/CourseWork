const {sequelize} = require('./index')
var refresh_session = require("./refresh_session");
var clients = require("./clients");
var authorization_client = require("./authorization_client");

authorization_client.belongsTo(clients, { as: "client", foreignKey: "client_id"});
clients.hasMany(authorization_client, { as: "authorization_clients", foreignKey: "client_id"});
refresh_session.belongsTo(clients, { as: "client", foreignKey: "client_id"});
clients.hasMany(refresh_session, { as: "refresh_session", foreignKey: "client_id"});


module.exports = {
  sequelize,
  refresh_session,
  clients,
  authorization_client,
};

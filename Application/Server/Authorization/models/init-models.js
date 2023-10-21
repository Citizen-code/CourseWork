const {sequelize} = require('./index')
var refresh_session_client = require("./refresh_session_client");
var refresh_session_employee = require("./refresh_session_employee");
var client = require("./clients");
var employee = require("./employee");
var authorization_client = require("./authorization_client");
var authorization_employee = require("./authorization_employee");

authorization_client.belongsTo(client, { as: "client", foreignKey: "client_id"});
refresh_session_client.belongsTo(client, { as: "client", foreignKey: "client_id"});
client.hasMany(authorization_client, { as: "authorization_clients", foreignKey: "client_id"});
client.hasMany(refresh_session_client, { as: "refresh_session_clients", foreignKey: "client_id"});

authorization_employee.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
refresh_session_employee.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
employee.hasMany(refresh_session_employee, { as: "refresh_session_employees", foreignKey: "employee_id"});
employee.hasMany(authorization_employee, { as: "authorization_employees", foreignKey: "employee_id"});

module.exports = {
  sequelize,
  refresh_session_employee,
  refresh_session_client,
  clients:client,
  employees:employee,
  authorization_client,
  authorization_employee,
};

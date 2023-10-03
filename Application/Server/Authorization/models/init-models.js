const sequelize = require('./index')
var refresh_sessions = require("./refreshsessions");
var users = require("./users");

refresh_sessions.belongsTo(users, { as: "user", foreignKey: "userId"});
users.hasMany(refresh_sessions, { as: "refreshsessions", foreignKey: "userId"});


module.exports = {
  sequelize,
  refresh_sessions,
  users,
};

const { sequelize, Op } = require('./index')
let car = require("./car");
let client = require("./client");
let consumable_part = require("./consumable_part");
let employee = require("./employee");
let engine = require("./engine");
let list_consumable_parts = require("./list_consumable_parts");
let list_services = require("./list_services");
let order = require("./order");
let photo = require("./photo");
let service = require("./service");
let status_order = require("./status_order");
let service_price = require("./service_price");

car.belongsTo(client, { as: "client", foreignKey: "client_id" });
client.hasOne(car, { as: "car", foreignKey: "client_id" });
order.belongsTo(client, { as: "client", foreignKey: "client_id" });
client.hasMany(order, { as: "orders", foreignKey: "client_id" });
list_consumable_parts.belongsTo(consumable_part, { as: "consumable_part", foreignKey: "consumable_part_id" });
consumable_part.hasMany(list_consumable_parts, { as: "list_consumable_parts", foreignKey: "consumable_part_id" });
order.belongsTo(employee, { as: "employee", foreignKey: "employee_id" });
employee.hasMany(order, { as: "orders", foreignKey: "employee_id" });
car.belongsTo(engine, { as: "engine", foreignKey: "engine_id" });
engine.hasMany(car, { as: "cars", foreignKey: "engine_id" });
list_consumable_parts.belongsTo(order, { as: "order", foreignKey: "order_id" });
order.hasMany(list_consumable_parts, { as: "list_consumable_parts", foreignKey: "order_id" });
list_services.belongsTo(order, { as: "order", foreignKey: "order_id" });
order.hasMany(list_services, { as: "list_services", foreignKey: "order_id" });
car.belongsTo(photo, { as: "photo", foreignKey: "photo_id" });
photo.hasMany(car, { as: "cars", foreignKey: "photo_id" });
consumable_part.belongsTo(photo, { as: "photo", foreignKey: "photo_id" });
photo.hasMany(consumable_part, { as: "consumable_parts", foreignKey: "photo_id" });
employee.belongsTo(photo, { as: "photo", foreignKey: "photo_id" });
photo.hasMany(employee, { as: "employees", foreignKey: "photo_id" });
list_services.belongsTo(service, { as: "service", foreignKey: "service_id" });
service.hasMany(list_services, { as: "list_services", foreignKey: "service_id" });
list_services.belongsTo(service_price, { as: "price", foreignKey: "price_id" });
service_price.hasMany(list_services, { as: "list_services", foreignKey: "price_id" });
service.belongsTo(service_price, { as: "price", foreignKey: "price_id" });
service_price.hasMany(service, { as: "services", foreignKey: "price_id" });
order.belongsTo(status_order, { as: "status", foreignKey: "status_id" });
status_order.hasMany(order, { as: "orders", foreignKey: "status_id" });

module.exports = {
  sequelize,
  status_order,
  car,
  client,
  consumable_part,
  employee,
  engine,
  list_consumable_parts,
  list_services,
  order,
  photo,
  service,
  service_price,
  Op
};

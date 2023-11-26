const { order, list_services, service, status_order, consumable_part, list_consumable_parts, service_price, employee, photo, client } = require('../models/init-models')

class OrderService {

    async findAll(option, include = undefined) {
        if (include == "true") {
            option.include = [
                { model: list_services, as: 'list_services', include: [
                    { model: service, as: 'service', include: { model: service_price, as: 'price' } },
                    { model: service_price, as: 'price' }]},
                { model: list_consumable_parts, as: 'list_consumable_parts', include: 
                    { model: consumable_part, as: 'consumable_part' }},
                { model: status_order, as: 'status' }, 
                { model: employee, as: 'employee', include:
                    {model:photo, as:'photo'}},
                { model: client, as: 'client'}
            ]
        }
        return await order.findAll(option)
    }

    async findOne(option, include = undefined) {
        if (include == "true") {
            option.include = [
                { model: list_services, as: 'list_services', include: [
                    { model: service, as: 'service', include: { model: service_price, as: 'price' } },
                    { model: service_price, as: 'price' }]},
                { model: list_consumable_parts, as: 'list_consumable_parts', include: 
                    { model: consumable_part, as: 'consumable_part' , include: {model:photo, as:'photo'}}},
                { model: status_order, as: 'status' },
                { model: client, as: 'client'},
                { model: employee, as: 'employee', include: {model:photo, as:'photo'}}
            ]
        }
        return await order.findOne(option)
    }

    async create(option) {
        option.status_id = 2
        return await order.create(option)
    }

    async GetCount(option) {
        return await order.count(option)
    }

    async update(option, where) {
        return await order.update(option, where)
    }

    async create_content(order_id, services, consumable_parts) {
        services.forEach(async (item) => {
            await list_services.create({ order_id, service_id: item.service_id, time: item.time != 0 ? item.time : undefined, price_id: item.price_id });
        })
        if (consumable_parts != undefined) {
            consumable_parts.forEach(async (item) => {
                await list_consumable_parts.create({ order_id, consumable_part_id: item.consumable_part_id });
            })
        }

    }
}
module.exports = new OrderService()
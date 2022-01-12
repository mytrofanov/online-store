const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))  //removes files to /static
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let {id, name, price, brandId, typeId} = req.body
            const device = await Device.update({name, price, brandId, typeId},
                {where: {id}})

            return next(ApiError.success('Изменения внесены'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next) {
        try {
            let {id} = req.body
            const device = await Device.destroy({where: {id}})
            return next(ApiError.success('Товар удален'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)

    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }


    // infoControllers

    async updateInfo(req, res, next) {
        try {
            let {info} = req.body
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.update({
                        title: i.title,
                        description: i.description
                    }, {where:{id:i.id}})
                )
                return next(ApiError.success('Изменения в инфо о товаре внесены'))
            } else return next(ApiError.success('В заголовке запроса нет info'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteInfo(req, res, next) {
        try {
            let {id} = req.body
            await DeviceInfo.destroy({where: {id}})
            return next(ApiError.success('Описание товара удалено'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }



}

module.exports = new DeviceController()
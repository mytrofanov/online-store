const uuid = require('uuid')
const path = require('path')
const {Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))  //removes files to /static

            const device = await Device.create({name, price, brandId, typeId, img:fileName})
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

module.exports = new DeviceController()
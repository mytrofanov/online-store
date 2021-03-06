const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next) {
        try {
            const {name} = req.body
            const brand = await Brand.destroy({where: {name}})
            return next(ApiError.success('Бренд товара удален'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }

}

module.exports = new BrandController()
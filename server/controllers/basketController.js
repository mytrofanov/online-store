const {BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class BasketController {
    async putInBasket(req, res, next) {
        try {
            let {deviceId, basketId, manyDevices} = req.body
            const basket = await BasketDevice.create({deviceId, basketId})
            if (manyDevices) {
                manyDevices = JSON.parse(manyDevices)
                manyDevices.forEach(i =>
                    BasketDevice.create({
                        deviceId: i.deviceId,
                        basketId: i.basketId
                    })
                )
            }
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteFromBasket(req, res, next) {
        try {
            let {deviceId, basketId, manyDevices} = req.body
            await BasketDevice.destroy({where: {deviceId, basketId}})
            if (manyDevices) {
                manyDevices = JSON.parse(manyDevices)
                manyDevices.forEach(i =>
                    BasketDevice.destroy({where: {
                            deviceId: i.deviceId,
                            basketId: i.basketId
                        }
                    })
                )
                return next(ApiError.success('Корзина очищена'))
            }
            return next(ApiError.success('товар удален из корзины'))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasket(req, res) {
        const {basketId} = req.body
        const basket = await BasketDevice.findAll({where:{basketId}})
        return res.json(basket)
    }

}

module.exports = new BasketController()
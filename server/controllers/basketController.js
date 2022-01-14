const {BasketDevice, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class BasketController {
    async putInBasket(req, res, next) {
        try {
            let {deviceId, basketId} = req.body
            if(deviceId && basketId) {
                const basket = await BasketDevice.create({deviceId, basketId})
                return next(ApiError.success('Товар с Id: ' + deviceId + 'добавлен в корзину'))
            } else return next(ApiError.success('в запросе deviceId= ' + deviceId + ' и basketId= ' + basketId))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delOneFromBasket(req, res, next) {
        try {
            let {deviceId, basketId} = req.body
            if (deviceId && basketId) {
                await BasketDevice.destroy({where: {deviceId, basketId}})
                return next(ApiError.success('товар удален из корзины'))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delSingleFromBasket(req, res, next) {
        try {
            let {id} = req.body
            if (id) {
                await BasketDevice.destroy({where: {id}})
                return next(ApiError.success('единица товара удалена из корзины'))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delAllFromBasket(req, res, next) {
        try {
            let {basketId} = req.body
            if (basketId) {
                await BasketDevice.destroy({where: {basketId}})
                return next(ApiError.success('Корзина очищена'))
            } else return next(ApiError.badRequest('в запросе отсутствует Id корзины. Id=' + basketId))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getBasket(req, res, next) {
        try {
            const {basketId} = req.query
            if (basketId) {
                const basket = await BasketDevice.findAll({where:{basketId}})
                return res.json(basket)
            } else return next(ApiError.success('в запросе отсутствует Id корзины. Id=' + basketId))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketId(req, res, next) {
        try {
            const {userId} = req.query
                if(userId) {
                    const basketId = await Basket.findOne({where:{userId}})
                    return res.json(basketId)
                }

        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()
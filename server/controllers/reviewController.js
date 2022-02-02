const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')


class ReviewController {
    async create(req, res) {
        try {
            let {rate, deviceId, userId, review} = req.body
            const rev = await Rating.create({rate, deviceId, userId, review})
            return res.json(rev)
        } catch (e) {
            return res.json(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            if(id) {
                await Rating.destroy({where: {id}})
                return next(ApiError.success('Отзыв удален'))
            }  else return next(ApiError.success('id= ' + id))

        }catch (e) {
            return res.json(e)
        }
    }

    async getAllForOneDevice(req, res) {
        try {
            const {deviceId} = req.query
            if (deviceId) {
                const reviews = await Rating.findAll({
                    where: {deviceId},
                })
                return res.json(reviews)
            }
        }catch (e) {
            return res.json(e)
        }

    }
    async getAll(req, res) {
        try {
            const reviews = await Rating.findAll()
            return res.json(reviews)
        }catch (e) {
            return res.json(e)
        }

    }

}

module.exports = new ReviewController()
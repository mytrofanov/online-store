const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {

    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //we need second word in string: (Bearer token)

        if (!token){
            return res.status(401).json({message:"user not authorized, MiddleWare"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!req.user) {
            return res.status(401).json({message:"user not authorized. No User in request"})
        }

        req.user = decoded
        next()
    } catch (e) {

        res.status(401).json({message: "user not authorized, catch in authMiddleware"})
    }
}


const requireAuth = (req, res, next, jwt) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized')
    }
    try {
        jwt.verify(authorization, process.env.JWT_SECRET)
    } catch {
        return res.status(401).json('Unauthorized')
    }
    return next()
}

module.exports = {
    requireAuth
}
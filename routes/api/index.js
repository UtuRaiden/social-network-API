const router = require('express').Router()
const userRoutes = require('./user')
const thoughtRoutes = require('./thought')

//how the router is used and the prefexes required
router.use('/user', userRoutes)
router.use('/thoughts', thoughtRoutes)


module.exports = router
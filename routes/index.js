//defines how the router is used and what prefix it needs
const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
  return res.send('404 Error!')
})

module.exports = router
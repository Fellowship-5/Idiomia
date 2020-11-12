const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('./db/mongodb')
const userRoutes = require('./routes/users-routes')
const proverbRoutes = require('./routes/proverbs-routes')
const adminRoutes = require('./admin-routes/admin-routes')
const checkAuth = require('./middleware/checkAuth')
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.use('/users', userRoutes)
app.use('/proverbs', proverbRoutes)

app.use(checkAuth)

app.use('/admin', adminRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    msg: 'Could not find the route'
  })
})

app.listen(PORT, () => {
  console.log('listening on ' + PORT)
})

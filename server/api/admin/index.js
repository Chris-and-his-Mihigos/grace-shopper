const router = require('express').Router();

module.exports = router

const reject = (status, msg, next) => {
  const err = new Error(msg)
  err.status = status
  next(err)
}

const isLoggedIn = (req, res, next) => {
  if (req.user) return next()
  reject(401, 'Sorry! You are not logged in.', next)
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  reject(401, 'Sorry! You are not authorized.')
}

router.use('/', isLoggedIn, isAdmin, (req, res, next) => {
  if (isLoggedIn && isAdmin) next();
  else {
    res.redirect(401, '/')
  }
})

router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});

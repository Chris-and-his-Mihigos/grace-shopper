const router = require('express').Router()
const User = require('../db/models/user')

module.exports = router

router.post('/login', (req, res, next) => {
  return User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  return User.create(req.body)
    .then((user) => {
      console.log('signingup', user)
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

//QUESTION: continued question about how we are persisting cart. Step # 2.
router.get('/me', (req, res) => {
  res.json(req.user);
})

//QUESTION: continued question about how we are persisting cart. Step # 3.
router.get('/sessionId', (req, res) => {
  res.json(req.session.sessionId);
});


router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))

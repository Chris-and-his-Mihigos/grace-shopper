const router = require('express').Router();
const { User } = require('../../db/models');

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({})
    .then(users => res.json(users))
    .catch(next)
});

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.status(201).send(user))
    .catch(next);
});

router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});

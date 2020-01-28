const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Users = require('../../data/helpers/users-model');

// GET all users
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(400).json({ error_message: 'No users found.' });
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(500).json({ error_message: 'Something went wrong' });
      }
    });
});

module.exports = router;

const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('../../data/helpers/users-model');

// REGISTRATION
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(req.body.password, 8);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// LOGIN
router.post('/login', (req, res) => {
  let { user_name, password } = req.body;

  Users.findBy({ user_name })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        res
          .status(200)
          .json({ message: `Welcome ${user.user_name}, You are logged in` });
      } else {
        res.status(401).json({ message: 'You Shall Not Pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/secret', (req, res) => {
  if (req.headers.authorization) {
    // what im checking, how many times, callback
    bc.hash(req.headers.authorization, 10, (err, hash) => {
      res.status(200).json({ hash });
    });
  } else {
    res.status(400).json({ error: 'something' });
  }
});

module.exports = router;

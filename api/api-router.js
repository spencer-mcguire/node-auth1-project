const router = require('express').Router();

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/user-router');

// router.use('/auth', authRouter);
// router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.json({ api: 'API is running' });
});

module.exports = router;

module.exports = (req, res, next) => {
  console.log(req.session);
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ error_message: 'You shall not pass..' });
  }
};

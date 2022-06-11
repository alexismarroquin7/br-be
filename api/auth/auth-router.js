const { validateLoginRequiredFields, validateUserExists, validatePassword } = require('./auth-middleware');

const router = require('express').Router();

router.post(
  '/login',
  validateLoginRequiredFields,
  validateUserExists,
  validatePassword,
  async (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.properties.email.email}!` });
  }
)

router.get('/logout', (req, res, next) => {
  if(req.session.user){
    // logout
    req.session.destroy(err => {
      if(err){
        next({ message: 'session was not destroyed' });
      } else {
        res.status(200).json({ message: 'logged out' })
      }
    });
  } else {
    next({ status: 200, message: 'no session' });
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;
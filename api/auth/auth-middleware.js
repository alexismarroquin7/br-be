const bcrypt = require('bcryptjs');
const User = require('../users/users-model');

const restricted = (req, res, next) => {
  if(req.session.user){
    next();
  } else {
    next({ status: 401, message: 'You shall not pass!' });
  }
}

const handlePasswordHash = (req, res, next) => {
  const { password } = req.body;
  try {
    const rounds = Number(process.env.DB_ROUNDS) || 8;
    const hash = bcrypt.hashSync(password, rounds);
    if(hash){
      req.hash = hash;
      next();
    } else {
      next({ status: 500, message: "an error occured while hashing password" })
    }
  } catch (err) {
    next(err);
  }
}

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  const valid = bcrypt.compareSync(password, req.user.properties.password.rich_text[0].text.content);
  
  req.session.user = req.user;
  
  if(valid){
    next();
  } else {
    next({
      status: 400,
      message: "incorrect password"
    });
  }
};

const validateUserExists = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if(user){
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: 'user does not exist'
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateLoginRequiredFields = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    next({
      status: 400,
      message: 'email and password are required'
    })
  } else {
    next();
  }
}

module.exports = {
  restricted,
  handlePasswordHash,
  validatePassword,
  validateUserExists,
  validateLoginRequiredFields
}
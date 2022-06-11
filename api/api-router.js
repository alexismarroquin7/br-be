const router = require('express').Router();
const menuItemsRouter = require('./menu_items/menu_items-router');
const menuCategoriesRouter = require('./menu_categories/menu_categories-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

router.use('/auth', authRouter);
router.use('/menu_items', menuItemsRouter);
router.use('/menu_categories', menuCategoriesRouter);
router.use('/users', usersRouter);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;
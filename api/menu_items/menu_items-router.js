const router = require('express').Router();
const MenuItem = require('./menu_items-model');

router.get(
  '/',
  async (req, res, next) => {
    try {
      const menuItems = await MenuItem.findAll(req.query);
      res.status(200).json(menuItems);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
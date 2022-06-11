const router = require('express').Router();
const MenuCategories = require('./menu_categories-model');

router.get(
  '/',
  async (req, res, next) => {
    try {
      const menuCategories = await MenuCategories.findAll(req.query);
      res.status(200).json(menuCategories);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
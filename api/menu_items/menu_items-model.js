const notion = require('../../notion');
const { mapPageListToObj } = require('../../utils');

const MenuCategories = require('../menu_categories/menu_categories-model');

const NOTION_MENU_ITEMS_DB = process.env.NOTION_MENU_ITEMS_DB;

const findAll = async ({ category = '' }) => {

  let filters = [];

  if(category !== ''){
    filters.push({
      property: "category",
      select: {
        equals: category
      }
    });
  }

  let menuCategories = await MenuCategories.findAll();

  menuCategories = mapPageListToObj(menuCategories.results);

  let res = await notion.databases.query({
    database_id: NOTION_MENU_ITEMS_DB,
    filter: {
      and: filters
    }
  });

  res = res.results.map(result => {
    result.properties.category.relation = [ menuCategories[result.properties.category.relation[0].id] ];
    return result;
  });
  
  return res;
}

module.exports = {
  findAll
}
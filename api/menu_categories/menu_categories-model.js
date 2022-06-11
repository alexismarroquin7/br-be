const notion = require('../../notion');

const NOTION_MENU_CATEGORIES_DB = process.env.NOTION_MENU_CATEGORIES_DB;

const findAll = async () => {
  let filters = [];

  const res = await notion.databases.query({
    database_id: NOTION_MENU_CATEGORIES_DB,
    filter: {
      and: filters
    }
  });
  
  return res;
}

module.exports = {
  findAll
}
const notion = require('../../notion');

const NOTION_USERS_DB = process.env.NOTION_USERS_DB;

const findAll = async () => {
  const res = await notion.databases.query({
    database_id: NOTION_USERS_DB
  })

  return res;
}


const findByEmail = async (email) => {
  const res = await notion.databases.query({
    database_id: NOTION_USERS_DB,
    filter: {
      property: "email",
      email: {
        equals: email
      }
    }
  })

  return res.results.length === 0
  ? null
  : res.results[0]
}

module.exports = {
  findAll,
  findByEmail
}
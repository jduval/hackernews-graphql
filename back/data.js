'use strict';

const mysql = require('./lib/mysql');
const {getURLTitle} = require('./utils/get-url-title');

const addNews = async({url}) => {
  const title = await getURLTitle(url);
  const result = await mysql.query({
    sql: 'insert into news values (0, ?, ?, 0, now())',
    args: [url, title]
  });
  return {
    id: result.insertId,
    title,
    url,
    creationTime: new Date().getTime() / 1000 | 0,
  };
};

const addComment = async({idNews, input}) => {
  const result = await mysql.query({
    sql: 'insert into comment values (0, ?, ?, 0, now())',
    args: [idNews, input]
  });
  return result.insertId;
};

const upVote = async({table, id}) => {
  const result = await mysql.query({
    sql: `update ${table} set score = score + 1 where id = ?`,
    args: id
  });
  return JSON.stringify({changedRows: result.changedRows});
};

const downVote = async({table, id}) => {
  const result = await mysql.query({
    sql: `update ${table} set score = score - 1 where id = ?`,
    args: id
  });
  return JSON.stringify({changedRows: result.changedRows});
};

module.exports = {
  addNews,
  addComment,
  upVote,
  downVote,
};

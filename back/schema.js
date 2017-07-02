'use strict';

const {
  addNews,
  addComment,
  upVote,
  downVote,
} = require('./data');
const mysql = require('./lib/mysql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const comment = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLID,
    },
    text: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
    creationTime: {
      type: GraphQLInt,
    },
  }
});

const news = new GraphQLObjectType({
  name: 'News',
  fields: {
    id: {
      type: GraphQLID,
    },
    url: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
    creationTime: {
      type: GraphQLInt,
    },
    comments: {
      type: new GraphQLList(comment),
      resolve: async(root) => {
        const result = await mysql.query({
          sql: 'select id, text, score, unix_timestamp(creation_time) as creationTime from comment where id_news = ?',
          args: root.id
        });
        return result;
      }
    }
  }
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    allNews: {
      type: new GraphQLList(news),
      resolve: async() => {
        const result = await mysql.query('select id, url, title, unix_timestamp(creation_time) as creationTime, score from news');
        return result;
      }
    },
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addNews: {
      type: GraphQLID,
      args: {
        url: {
          type: GraphQLString
        },
      },
      resolve: (root, {url}) => addNews({url})
    },
    upVoteNews: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (root, {id}) => upVote({table: 'news', id})
    },
    downVoteNews: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (root, {id}) => downVote({table: 'news', id})
    },
    addComment: {
      type: GraphQLID,
      args: {
        idNews: {
          type: GraphQLID,
        },
        input: {
          type: GraphQLString,
        }
      },
      resolve: (root, {idNews, input}) => addComment({idNews, input})
    },
    upVoteComment: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (root, {id}) => upVote({table: 'comment', id})
    },
    downVoteComment: {
      type: GraphQLString,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (root, {id}) => downVote({table: 'comment', id})
    },
  }
});

exports.schema = new GraphQLSchema({
  query,
  mutation,
});

const express = require('express');
const graphqlHTTP = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const mysql = require('./lib/mysql');

const news = new GraphQLObjectType({
  name: 'News',
  fields: {
    id: {
      type: GraphQLID,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      news: {
        type: news,
        args: {
          id: {
            type: GraphQLID
          },
          url: {
            type: GraphQLString
          }
        },
        resolve: async (root, { id }) => {
          const result = await mysql.query({
            sql: 'select id, url from news where id = ?',
            args: id
          });
          return result[0];
        }
      }
    }
  })
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);

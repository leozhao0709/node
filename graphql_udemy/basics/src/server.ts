import app from './app';
import { ApolloServer, gql } from 'apollo-server-express';

export const startServer = async () => {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      greeting(name: String, position: String): User!
      add(a: Float!, b: Float!): Float!
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      greeting: (parent, { name, position }, ctx, info) => {
        // return `Hello, ${name}, your position is ${position}`;
        return {
          id: '123098',
          name: 'Mike',
          email: 'mike@example.com',
        };
      },
      me: () => {
        return {
          id: '123098',
          name: 'Mike',
          email: 'mike@example.com',
        };
      },
      post: () => {
        return {
          id: '092',
          title: 'GraphQL 101',
          body: '',
          published: false,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });

  return { server, app };
};

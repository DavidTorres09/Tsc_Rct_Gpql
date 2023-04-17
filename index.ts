import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: Int!, name: String, email: String): User!
    deleteUser(id: Int!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_parent: any, { id }: { id: number }) => prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_parent: any, { name, email }: { name: string; email: string }) =>
      prisma.user.create({ data: { name, email } }),
    updateUser: (_parent: any, { id, name, email }: { id: number; name?: string; email?: string }) =>
      prisma.user.update({ where: { id }, data: { name, email } }),
      deleteUser: (_parent: any, { id }: { id: number }) => prisma.user.delete({ where: { id } }),
    },
  };
  
  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

import { gql } from 'apollo-server';
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';

const typeDefs = gql`
    scalar DateTime
    scalar EmailAddress

    type Account {
        userId: Int!
        email: String!
        createdAt: DateTime!
        updatedAt: DateTime
        profile: Profile!
    }
    type Profile {
        userId: Int!
        firstName: String!
        lastName: String!
        middleName: String
        createdAt: DateTime!
        updatedAt: DateTime
    }
    input CreateAccountInput {
        email: EmailAddress!
        password: String
        firstName: String!
        lastName: String!
        middleName: String
    }
    extend type Mutation {
        addAccountWithProfile(info: CreateAccountInput!): Account!
    }
    extend type Query {
        allAccounts: [Account]!
    }
`;

const resolvers = {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    Account: {
        async profile(account, __, { services }) {
            return services.account.findProfile(account.userId);
        },
    },
    Mutation: {
        async addAccountWithProfile(_, { info }, { services }) {
            return services.account.addAccount(info);
        },
    },
    Query: {
        async allAccounts(_, __, { services }) {
            return services.account.findAll();
        }
    },
};

export default {typeDefs, resolvers};
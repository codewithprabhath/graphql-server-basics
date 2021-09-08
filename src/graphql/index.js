import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server';
import merge from 'lodash.merge';

const defaultTypeDefs = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const createSchema = () => {
    return makeExecutableSchema({
        typeDefs: [
            defaultTypeDefs,
        ],
        resolvers: merge(
            {},
        ),
    });
};

export default createSchema;
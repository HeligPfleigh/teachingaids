import DateScalarType from './DateScalarType';

export const schema = [`
  # scalar types
  scalar Date

  # Interface
  # An object with an ID.
  interface Node {
    _id: ID!
  }
`];

export const resolvers = {
  Date: DateScalarType,
};

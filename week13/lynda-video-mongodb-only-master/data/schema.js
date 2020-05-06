import { buildSchema } from "graphql";
import { resolvers } from "./resolvers";
import { makeExecutableSchema } from "graphql-tools"; // https://github.com/ardatan/graphql-tools

/*
THIS IS WHERE WE MAKE OUR TYPE DEFINITIONS, BOTH FOR OBJECTS, AND MUTATIONS AND QUERIES. 
A MUTATION IS A POST OR PUT OR DELETE
A QUERY IS A GET

THIS ALSO MAKES AUTOMATIC DOCUMENTATION

NEXT LAYER DOWN IS RESOLVERS.JS IN SAME FOLDER
*/

// We've already defined Types with Mongoose, but more typing here.
// ! means required
// Enum means possible options for that category
// This also helps with documentation.
const typeDefs = `

  type Friend {
    id: ID
    firstName: String
    lastName: String
    language: String
    gender : Gender
    age: Int
    email: String
    contacts: [Contact]
  }

  type Contact {
    firstName: String
    lastName: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Query {
    getOneFriend(id: ID!): Friend
    allFriends: [Friend]!
  }

  input FriendInput {
    id: ID
    firstName: String!
    lastName: String
    language: String
    gender : Gender
    age: Int
    email: String
    contacts: [ContactInput]
  }

  input ContactInput {
    firstName: String
    lastName: String
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(input: FriendInput): Friend
    deleteFriend(id:ID!):String
  }
`;
// https://stackoverflow.com/questions/47381519/what-is-the-difference-between-buildschema-and-makeexecutableschema

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

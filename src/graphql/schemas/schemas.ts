import { buildSchema } from "graphql"
import userSchema from "./userSchema"
import bucketSchema from "./bucketSchema"
import champSchema from "./champSchema"

const Schema = buildSchema(`
  ${userSchema}
  ${bucketSchema}
  ${champSchema}

  type rootQuery {
    signS3(filename: String!): S3Payload!
    login(email: String!, password: String): User!
  }

  type rootMutation {
    createUser(userInput: userInput): User!
    forgot(email: String!): String!
    updatePP(icon: String!, profile_picture: String!): User!
    updateName(name: String!): User!
    updateEmail(email: String!): User!
    updatePassword(currentPass: String!, password: String!, passConfirm: String!): User!
    createChamp(champInput: champInput): Champ!
  }

  schema {
    query: rootQuery
    mutation: rootMutation
  }
`)

export default Schema

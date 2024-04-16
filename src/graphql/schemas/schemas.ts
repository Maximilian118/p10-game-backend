import { buildSchema } from "graphql"
import userSchema from "./userSchema"
import bucketSchema from "./bucketSchema"

const Schema = buildSchema(`
  ${userSchema}
  ${bucketSchema}

  type rootQuery {
    signS3(filename: String!): S3Payload!
  }

  type rootMutation {
    createUser(userInput: userInput): User!
  }

  schema {
    query: rootQuery
    mutation: rootMutation
  }
`)

export default Schema

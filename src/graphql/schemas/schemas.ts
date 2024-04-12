import { buildSchema } from "graphql"
import userSchema from "./userSchema"

const Schema = buildSchema(`
  ${userSchema}

  type rootQuery {
    login(email: String!, password: String): User!
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

import { buildSchema } from "graphql"
import userSchema from "./userSchema"
import bucketSchema from "./bucketSchema"
import champSchema from "./champSchema"
import badgeSchema from "./badgeSchema"

const Schema = buildSchema(`
  ${userSchema}
  ${bucketSchema}
  ${champSchema}
  ${badgeSchema}

  type rootQuery {
    signS3(filename: String!): S3Payload!
    login(email: String!, password: String): User!
    getBadgesByChamp(championship: String): Badges
  }

  type rootMutation {
    createUser(userInput: userInput): User!
    forgot(email: String!): String!
    updatePP(icon: String!, profile_picture: String!): User!
    updateName(name: String!): User!
    updateEmail(email: String!): User!
    updatePassword(currentPass: String!, password: String!, passConfirm: String!): User!
    createChamp(champInput: champInput): Champ!
    newBadge(badgeInput: badgeInput): Badge!
  }

  schema {
    query: rootQuery
    mutation: rootMutation
  }
`)

export default Schema

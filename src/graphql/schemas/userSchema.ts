const userSchema = `
  type User {
    _id: ID!
    refresh_count: Int!
    name: String!
    email: String!
    icon: String!
    profile_picture: String!
    championships: [String]!
    logged_in_at: String!
    created_at: String!
    updated_at: String!
    password: String
    tokens: String
  }

  input userInput {
    name: String!
    email: String!
    password: String!
    passConfirm: String!
    icon: String
    profile_picture: String
  }
`
export default userSchema

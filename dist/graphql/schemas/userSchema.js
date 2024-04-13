"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = `
  type User {
    _id: ID!
    refresh_count: Int!
    name: String!
    email: String!
    icon: String
    profile_picture: String
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
`;
exports.default = userSchema;
//# sourceMappingURL=userSchema.js.map
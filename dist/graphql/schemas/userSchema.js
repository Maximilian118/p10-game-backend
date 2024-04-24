"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = `
  type Permissions {
    admin: Boolean
    adjudicator: Boolean
    guest: Boolean
  }

  type Badge {
    _id: ID!
    user_id: ID!
    url: String!
    name: String!
    rarity: Int!
    created_at: String!
  }

  type User {
    _id: ID!
    refresh_count: Int!
    name: String!
    email: String!
    icon: String
    profile_picture: String
    championships: [String]!
    badges: [Badge!]!
    permissions: Permissions!
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
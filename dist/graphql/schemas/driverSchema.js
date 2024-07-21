"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driverSchema = `
  type Stats {
    heightCM: Int!
    weightKG: Int!
    age: Int!
    moustache: Boolean!
    mullet: Boolean!
  }

  type Driver {
    _id: ID!
    url: String!
    name: String!
    driverGroups: [String!]
    stats: Stats!
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  input statsInput {
    heightCM: Int!
    weightKG: Int!
    age: Int!
    moustache: Boolean!
    mullet: Boolean!
  }

  input driverInput {
    url: String!
    name: String!
    driverGroups: [String!]
    stats: statsInput!
  }
`;
exports.default = driverSchema;
//# sourceMappingURL=driverSchema.js.map
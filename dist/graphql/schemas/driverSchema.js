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
    driverID: String!
    team: ID!
    driverGroups: [ID!]
    stats: Stats!
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  type Drivers {
    array: [Driver!]!
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
    driverID: String!
    team: ID!
    driverGroups: [String!]
    stats: statsInput!
  }
`;
exports.default = driverSchema;
//# sourceMappingURL=driverSchema.js.map
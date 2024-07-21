"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driverGroupSchema = `
  type DriverGroup {
    _id: ID!
    url: String!
    name: String!
    championships: [String!]
    drivers: [String!]
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  type DriverGroups {
    array: [DriverGroup!]!
    tokens: [String!]
  }

  input driverGroupInput {
    url: String!
    name: String!
    championships: [String!]!
    drivers: [String!]!
  }
`;
exports.default = driverGroupSchema;
//# sourceMappingURL=driverGroupSchema.js.map
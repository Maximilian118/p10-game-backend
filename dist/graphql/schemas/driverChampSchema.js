"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driverChampSchema = `
  type DriverChamp {
    _id: ID!
    url: String!
    name: String!
    championships: [String!]
    drivers: [String!]
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  input driverChampInput {
    url: String!
    name: String!
    championships: [String!]!
    drivers: [String!]!
  }
`;
exports.default = driverChampSchema;
//# sourceMappingURL=driverChampSchema.js.map
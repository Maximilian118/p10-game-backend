"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const champInput = `
  type Champ {
    _id: ID!
    name: String!
    icon: String
    created_at: String!
    updated_at: String!
    tokens: String
  }

  input champInput {
    name: String!
    icon: String
  }
`;
exports.default = champInput;
//# sourceMappingURL=champSchema.js.map
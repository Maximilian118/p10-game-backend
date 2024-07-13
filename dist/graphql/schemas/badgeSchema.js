"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const badgeSchema = `
  type Badge {
    _id: ID!
    championship: String
    url: String!
    name: String!
    rarity: Int!
    awardedTo: [String!]!
    awardedHow: String!
    awardedDesc: String!
    zoom: Int!
    created_at: String!
    updated_at: String!
    tokens: String
  }
  
  type Badges {
    array: [Badge!]!
    tokens: String
  }

  input badgeInput {
    url: String!
    name: String!
    rarity: Int!
    awardedHow: String!
    awardedDesc: String!
    zoom: Int
    championship: String
  }
`;
exports.default = badgeSchema;
//# sourceMappingURL=badgeSchema.js.map
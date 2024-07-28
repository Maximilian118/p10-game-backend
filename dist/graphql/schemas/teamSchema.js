"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teamSchema = `
  type TeamStats {
    inceptionDate: String!
    locationHQ: String!
    nationality: String!
  }

  type Team {
    _id: String!
    url: String!
    name: String!
    driverGroups: [ID!]
    drivers: [ID!]
    stats: TeamStats!
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  type Teams {
    array: [Team!]!
    tokens: [String!]
  }

  input TeamStatsInput {
    inceptionDate: String!
    locationHQ: String!
    nationality: String!
  }

  input teamInput {
    url: String!
    name: String!
    driverGroups: [ID!]
    drivers: [ID!]!
    stats: TeamStatsInput!
  }
`;
exports.default = teamSchema;
//# sourceMappingURL=teamSchema.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userSchema_1 = __importDefault(require("./userSchema"));
const bucketSchema_1 = __importDefault(require("./bucketSchema"));
const champSchema_1 = __importDefault(require("./champSchema"));
const badgeSchema_1 = __importDefault(require("./badgeSchema"));
const driverSchema_1 = __importDefault(require("./driverSchema"));
const driverGroupSchema_1 = __importDefault(require("./driverGroupSchema"));
const Schema = (0, graphql_1.buildSchema)(`
  ${userSchema_1.default}
  ${bucketSchema_1.default}
  ${champSchema_1.default}
  ${badgeSchema_1.default}
  ${driverGroupSchema_1.default}
  ${driverSchema_1.default}

  type rootQuery {
    signS3(filename: String!): S3Payload!
    login(email: String!, password: String): User!
    getBadgesByChamp(championship: String): Badges
    getDriverGroups: DriverGroups 
  }

  type rootMutation {
    createUser(userInput: userInput): User!
    forgot(email: String!): String!
    updatePP(icon: String!, profile_picture: String!): User!
    updateName(name: String!): User!
    updateEmail(email: String!): User!
    updatePassword(currentPass: String!, password: String!, passConfirm: String!): User!
    createChamp(champInput: champInput): Champ!
    newBadge(badgeInput: badgeInput): Badge!
    updateBadge(updateBadgeInput: updateBadgeInput): Badge!
    newDriverGroup(driverGroupInput: driverGroupInput): DriverGroup!
    newDriver(driverInput: driverInput): Driver!
  }

  schema {
    query: rootQuery
    mutation: rootMutation
  }
`);
exports.default = Schema;
//# sourceMappingURL=schemas.js.map
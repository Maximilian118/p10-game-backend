"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userSchema_1 = __importDefault(require("./userSchema"));
const bucketSchema_1 = __importDefault(require("./bucketSchema"));
const Schema = (0, graphql_1.buildSchema)(`
  ${userSchema_1.default}
  ${bucketSchema_1.default}

  type rootQuery {
    signS3(filename: String!): S3Payload!
  }

  type rootMutation {
    createUser(userInput: userInput): User!
  }

  schema {
    query: rootQuery
    mutation: rootMutation
  }
`);
exports.default = Schema;
//# sourceMappingURL=schemas.js.map
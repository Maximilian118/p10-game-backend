"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bucketSchema = `
  type S3Payload {
    signedRequest: String!,
    url: String!,
    tokens: String,
  }
`;
exports.default = bucketSchema;
//# sourceMappingURL=bucketSchema.js.map
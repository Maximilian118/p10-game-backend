"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userResolvers_1 = __importDefault(require("./userResolvers"));
const bucketResolvers_1 = __importDefault(require("./bucketResolvers"));
const Resolvers = Object.assign(Object.assign({}, userResolvers_1.default), bucketResolvers_1.default);
exports.default = Resolvers;
//# sourceMappingURL=resolvers.js.map
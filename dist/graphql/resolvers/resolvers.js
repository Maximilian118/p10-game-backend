"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userResolvers_1 = __importDefault(require("./userResolvers"));
const bucketResolvers_1 = __importDefault(require("./bucketResolvers"));
const badgeResolvers_1 = __importDefault(require("./badgeResolvers"));
const driverGroupResolvers_1 = __importDefault(require("./driverGroupResolvers"));
const driverResolvers_1 = __importDefault(require("./driverResolvers"));
const teamResolvers_1 = __importDefault(require("./teamResolvers"));
const Resolvers = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userResolvers_1.default), bucketResolvers_1.default), badgeResolvers_1.default), driverGroupResolvers_1.default), driverResolvers_1.default), teamResolvers_1.default);
exports.default = Resolvers;
//# sourceMappingURL=resolvers.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailErrors = exports.nameErrors = void 0;
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("../../models/user"));
const throwError = (type, value, message, code) => {
    throw new graphql_1.GraphQLError(JSON.stringify({
        type: type.toLowerCase(),
        value,
        message,
        code: code ? code : 400,
    }));
};
const nameErrors = (name) => {
    const type = "name";
    if (!name) {
        throwError(type, name, "Please enter a name.");
    }
    if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
        if (name.length > 30) {
            throwError(type, name, "30 characters maximum.");
        }
        throwError(type, name, "No numbers or special characters.");
    }
};
exports.nameErrors = nameErrors;
const emailErrors = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "email";
    if (!email) {
        throwError(type, email, "Please enter an email.");
    }
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
        throwError(type, email, "Please enter a valid email address.");
    }
    if (yield user_1.default.findOne({ email })) {
        throwError(type, email, "A user by that email already exists!");
    }
});
exports.emailErrors = emailErrors;
//# sourceMappingURL=resolverErrors.js.map
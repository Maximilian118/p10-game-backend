"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameErrors = void 0;
const graphql_1 = require("graphql");
const throwError = (type, value, message, code) => {
    throw new graphql_1.GraphQLError(JSON.stringify({
        type: type.toLowerCase(),
        value,
        message,
        code: code ? code : 400,
    }));
};
const nameErrors = (name) => {
    const value = "name";
    if (!name) {
        throwError(value, name, "Please enter a name.");
    }
    if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
        if (name.length > 30) {
            throwError(value, name, "30 characters maximum.");
        }
        throwError(value, name, "No numbers or special characters.");
    }
};
exports.nameErrors = nameErrors;
//# sourceMappingURL=resolverErrors.js.map
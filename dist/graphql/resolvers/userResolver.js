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
const moment_1 = __importDefault(require("moment"));
const user_1 = __importDefault(require("../../models/user"));
const utility_1 = require("../../shared/utility");
const graphql_1 = require("graphql");
const userResolver = {
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, icon, profile_picture } = args.userInput;
            if (!name) {
                throw new graphql_1.GraphQLError((0, utility_1.resolverError)({
                    type: "name",
                    message: "Please enter a name",
                    code: 400,
                    value: name,
                }));
            }
            const user = new user_1.default({
                name,
                email,
                icon,
                profile_picture,
                password: yield (0, utility_1.hashPass)(password),
                created_at: (0, moment_1.default)().format(),
                updated_at: (0, moment_1.default)().format(),
                logged_in_at: (0, moment_1.default)().format(),
            }, (err) => {
                if (err)
                    throw new Error(err);
            });
            yield user.save();
            return Object.assign(Object.assign({}, user._doc), { tokens: JSON.stringify((0, utility_1.signTokens)(user)), password: null });
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = userResolver;
//# sourceMappingURL=userResolver.js.map
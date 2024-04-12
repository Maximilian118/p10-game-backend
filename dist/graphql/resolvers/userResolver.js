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
const userResolver = {
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("createUser");
        try {
            const { name, email, password, passConfirm, icon, profile_picture } = args.userInput;
            if (!name) {
                throw new Error(JSON.stringify({
                    type: "name",
                    message: "Please enter your name. Feel free to make one up!",
                }));
            }
            else if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
                throw new Error(JSON.stringify({
                    type: "name",
                    message: "Your name cannot contain numbers or special characters other than hyphens and apostrophes.",
                }));
            }
            if (!email) {
                throw new Error("Please enter an email address.");
            }
            else if (yield user_1.default.findOne({ email })) {
                throw new Error(JSON.stringify({
                    type: "email",
                    message: "A User by that email already exists!",
                }));
            }
            else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
                throw new Error(JSON.stringify({
                    type: "email",
                    message: "Please enter a valid email address.",
                }));
            }
            if (!password) {
                throw new Error(JSON.stringify({
                    type: "password",
                    message: "Please enter a password.",
                }));
            }
            else if (!/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,20}$/.test(password)) {
                throw new Error(JSON.stringify({
                    type: "password",
                    message: "Your password must have at least one letter and one number. Minimum 8 characters.",
                }));
            }
            if (!passConfirm) {
                throw new Error(JSON.stringify({
                    type: "passConfirm",
                    message: "Please enter your password confirmation.",
                }));
            }
            else if (password !== passConfirm) {
                throw new Error(JSON.stringify({
                    type: "passConfirm",
                    message: "Passwords do not match.",
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
            console.log(`${email} created an account.`);
            return Object.assign(Object.assign({}, user._doc), { tokens: JSON.stringify((0, utility_1.signTokens)(user)), password: null });
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = userResolver;
//# sourceMappingURL=userResolver.js.map
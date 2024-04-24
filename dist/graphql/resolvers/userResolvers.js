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
const generate_password_1 = __importDefault(require("generate-password"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const resolverErrors_1 = require("./resolverErrors");
const userResolvers = {
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, passConfirm, icon, profile_picture } = args.userInput;
            yield (0, resolverErrors_1.nameErrors)(name);
            yield (0, resolverErrors_1.emailErrors)(email);
            (0, resolverErrors_1.passwordErrors)(password, passConfirm);
            (0, resolverErrors_1.passConfirmErrors)(passConfirm, password);
            (0, resolverErrors_1.iconErrors)(icon, profile_picture);
            (0, resolverErrors_1.profilePictureErrors)(profile_picture, icon);
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
    login: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
        try {
            const user = (yield user_1.default.findOne({ email }));
            (0, resolverErrors_1.userErrors)(user);
            if (!password) {
                (0, resolverErrors_1.throwError)("password", user, "No password entry.");
            }
            else if (user.password && !(yield (0, utility_1.comparePass)(password, user.password))) {
                (0, resolverErrors_1.throwError)("password", user, "Incorrect password.");
            }
            user.logged_in_at = (0, moment_1.default)().format();
            yield user.save();
            return Object.assign(Object.assign({}, user._doc), { tokens: JSON.stringify((0, utility_1.signTokens)(user)), password: null });
        }
        catch (err) {
            throw err;
        }
    }),
    forgot: (_b) => __awaiter(void 0, [_b], void 0, function* ({ email }) {
        try {
            const user = (yield user_1.default.findOne({ email }));
            (0, resolverErrors_1.userErrors)(user);
            const randomPass = generate_password_1.default.generate({
                length: 10,
                numbers: true,
            });
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.NODEMAILER_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });
            transporter.verify((err) => {
                if (err) {
                    console.error(err);
                }
            });
            const mail = {
                from: process.env.NODEMAILER_EMAIL,
                to: email,
                subject: "P10-Game Password Reset",
                text: `
        Your password is now: 
        ${randomPass}.

        If you did not expect this email contact maxcrosby118@gmail.com immediately! 🚨
        `,
            };
            user.password = yield (0, utility_1.hashPass)(randomPass);
            user.updated_at = (0, moment_1.default)().format();
            yield user.save();
            transporter.sendMail(mail, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            return "Forgot request submitted.";
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = userResolvers;
//# sourceMappingURL=userResolvers.js.map
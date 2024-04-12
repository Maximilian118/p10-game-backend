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
exports.comparePass = exports.hashPass = exports.signTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const signTokens = (user) => {
    const access_token = jsonwebtoken_1.default.sign({
        _id: user._id,
    }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "15m" });
    const refresh_token = jsonwebtoken_1.default.sign({
        _id: user._id,
        refresh_count: user.refresh_count,
    }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: "7d" });
    return {
        access_token,
        refresh_token,
    };
};
exports.signTokens = signTokens;
const hashPass = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const s = yield (0, bcryptjs_1.genSalt)(Number(process.env.PASSWORD_SALT));
    return (0, bcryptjs_1.hash)(pass, s);
});
exports.hashPass = hashPass;
const comparePass = (pass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(pass, hashedPass);
});
exports.comparePass = comparePass;
//# sourceMappingURL=utility.js.map
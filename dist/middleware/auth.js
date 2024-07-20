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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const utility_1 = require("../shared/utility");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenHeader = req.get("accessToken");
    const refreshTokenHeader = req.get("refreshToken");
    req.isAuth = false;
    req.tokens = [];
    if (!accessTokenHeader && !refreshTokenHeader) {
        return next();
    }
    const accessToken = accessTokenHeader && accessTokenHeader.split(" ")[1];
    if (!accessToken || accessToken === "") {
        res.status(401);
        return next();
    }
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (typeof verifiedToken === "string") {
            console.error("Error: Invalid accessToken");
            res.status(401);
            return next();
        }
        req.isAuth = true;
        req._id = verifiedToken._id;
        res.status(200);
        return next();
    }
    catch (_a) { }
    if (!refreshTokenHeader) {
        res.status(401);
        return next();
    }
    const refreshToken = refreshTokenHeader.split(" ")[1];
    if (!refreshToken || refreshToken === "") {
        res.status(401);
        return next();
    }
    let verifiedRefreshToken = {};
    try {
        verifiedRefreshToken = jsonwebtoken_1.default.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
    }
    catch (_b) {
        res.status(401);
        return next();
    }
    if (typeof verifiedRefreshToken === "string") {
        console.error("Error: Invalid refreshToken");
        res.status(401);
        return next();
    }
    const user = yield user_1.default.findOne({ _id: verifiedRefreshToken._id });
    if (!user || user.refresh_count !== verifiedRefreshToken.refresh_count) {
        res.status(401);
        return next();
    }
    req.tokens = (0, utility_1.signTokens)(user);
    req.isAuth = true;
    req._id = verifiedRefreshToken._id;
    res.status(200);
    next();
});
exports.default = auth;
//# sourceMappingURL=auth.js.map
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
exports.deleteS3 = exports.isDuplicateS3 = exports.formatErrHandler = exports.comparePass = exports.hashPass = exports.signTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const client_s3_1 = require("@aws-sdk/client-s3");
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
const isJSON = (str) => {
    if (typeof str !== "string")
        return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === "[object Object]" || type === "[object Array]";
    }
    catch (err) {
        return false;
    }
};
const formatErrHandler = (error) => {
    if (isJSON(error.message)) {
        const err = JSON.parse(error.message);
        return {
            type: err.type ? err.type : "",
            message: err.message ? err.message : "",
            code: err.code ? err.code : 400,
            value: err.value ? err.value : null,
            locations: error.locations ? error.locations : [],
            path: error.path ? error.path : [],
        };
    }
    else {
        return {
            type: "Unknown",
            message: error.message ? error.message : "",
            code: 400,
            value: null,
            locations: error.locations ? error.locations : [],
            path: error.path ? error.path : [],
        };
    }
};
exports.formatErrHandler = formatErrHandler;
const isDuplicateS3 = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.send(new client_s3_1.HeadObjectCommand(params));
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.isDuplicateS3 = isDuplicateS3;
const deleteS3 = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const keyArr = [];
    const fileNameArr = (_a = params.Key) === null || _a === void 0 ? void 0 : _a.split("/");
    const listParams = {
        Bucket: params.Bucket,
        Prefix: `${fileNameArr[0]}/${fileNameArr[1]}`,
    };
    try {
        const list = yield client.send(new client_s3_1.ListObjectsCommand(listParams));
        if (list.Contents && list.Contents.length === 0) {
            return;
        }
        (_b = list.Contents) === null || _b === void 0 ? void 0 : _b.forEach((img) => {
            keyArr.push({
                Key: img.Key,
            });
        });
    }
    catch (error) {
        console.log("Failed to list images...");
    }
    const deleteParams = Object.assign(Object.assign({}, params), { Delete: {
            Objects: keyArr,
        } });
    try {
        yield client.send(new client_s3_1.DeleteObjectsCommand(deleteParams));
    }
    catch (error) {
        console.log(error);
        console.log("Delete images failed...");
    }
});
exports.deleteS3 = deleteS3;
//# sourceMappingURL=utility.js.map
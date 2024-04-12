"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsHandler = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, accessToken, refreshToken");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
};
exports.default = corsHandler;
//# sourceMappingURL=corsHandler.js.map
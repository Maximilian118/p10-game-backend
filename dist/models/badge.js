"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const badgeSchema = new mongoose_1.default.Schema({
    championship: { type: mongoose_1.default.Schema.ObjectId, ref: "Champ" },
    url: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" },
    rarity: { type: Number, required: true, default: 0 },
    awardedTo: [{ type: mongoose_1.default.Schema.ObjectId, ref: "User" }],
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const Badge = mongoose_1.default.model("Badge", badgeSchema);
exports.default = Badge;
//# sourceMappingURL=badge.js.map
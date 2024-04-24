"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false, min: 8 },
    icon: { type: String, required: false, default: "" },
    profile_picture: { type: String, required: false, default: "" },
    championships: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Championships" }],
    badges: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Badge" }],
    refresh_count: { type: Number, default: 0 },
    logged_in_at: { type: String, default: (0, moment_1.default)().format() },
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
    permissions: {
        type: {
            admin: Boolean,
            adjudicator: Boolean,
            guest: Boolean,
        },
        required: false,
        default: {
            admin: false,
            adjudicator: false,
            guest: false,
        },
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map
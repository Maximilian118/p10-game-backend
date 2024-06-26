"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const protestSchema = new mongoose_1.default.Schema({
    championship: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "Champ" },
    createdBy: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    vote: { type: Boolean, default: false },
    voteArr: [
        {
            user: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
            approve: { type: Boolean, default: false },
        },
    ],
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const Protest = mongoose_1.default.model("Protest", protestSchema);
exports.default = Protest;
//# sourceMappingURL=protest.js.map
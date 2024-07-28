"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const teamSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    driverGroups: [{ type: mongoose_1.default.Schema.ObjectId, ref: "DriverGroup" }],
    drivers: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Driver" }],
    stats: {
        inceptionDate: { type: String, required: true },
        locationHQ: { type: String, required: true },
        nationality: { type: String, required: true },
    },
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const Team = mongoose_1.default.model("Team", teamSchema);
exports.default = Team;
//# sourceMappingURL=team.js.map
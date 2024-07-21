"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const driverGroupSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    championships: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Champ" }],
    drivers: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Driver" }],
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const DriverGroup = mongoose_1.default.model("DriverGroup", driverGroupSchema);
exports.default = DriverGroup;
//# sourceMappingURL=driverGroup.js.map
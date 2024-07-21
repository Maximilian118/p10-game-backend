"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const driverSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    driverGroups: [{ type: mongoose_1.default.Schema.ObjectId, ref: "DriverGroup" }],
    stats: {
        heightCM: { type: Number, required: true },
        weightKG: { type: Number, required: true },
        age: { type: Number, required: true },
        moustache: { type: Boolean, default: false },
        mullet: { type: Boolean, default: false },
    },
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const Driver = mongoose_1.default.model("Driver", driverSchema);
exports.default = Driver;
//# sourceMappingURL=driver.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const champSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    season: { type: String, required: true },
    nextRound: { type: String, default: "Round 1" },
    adjudicator: {
        current: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
        since: { type: String, default: (0, moment_1.default)().format() },
        rounds: [{ type: String }],
        player: { type: Boolean, default: true },
        history: [
            {
                adjudicator: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                since: { type: String, default: (0, moment_1.default)().format() },
                rounds: [{ type: String }],
            },
        ],
    },
    players: [{ type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" }],
    pointsStructure: [
        {
            result: { type: Number, required: true },
            points: { type: Number, required: true },
        },
    ],
    points: [
        {
            player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
            points: { type: Number, required: true },
            history: [
                {
                    round: { type: String, required: true },
                    points: { type: Number, required: true },
                },
            ],
        },
    ],
    rulesAndRegs: {
        default: { type: Boolean, default: true },
        list: [
            {
                text: { type: String, required: true },
                createdBy: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                created_at: { type: String, default: (0, moment_1.default)().format() },
                histroy: {
                    text: { type: String, required: true },
                    updatedBy: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    updated_at: { type: String, default: (0, moment_1.default)().format() },
                },
                subsections: [
                    {
                        text: { type: String, required: true },
                        createdBy: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                        created_at: { type: String, default: (0, moment_1.default)().format() },
                        histroy: {
                            text: { type: String, required: true },
                            updatedBy: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                            updated_at: { type: String, default: (0, moment_1.default)().format() },
                        },
                    },
                ],
            },
        ],
    },
    protests: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Protest" }],
    ruleChanges: [{ type: mongoose_1.default.Schema.ObjectId, ref: "RuleChange" }],
    settings: {
        maxPlayers: { type: Number, default: 0 },
        inactivePlayers: { type: Boolean, default: true },
        protests: {
            protestsAlwaysVote: { type: Boolean, default: false },
            allowMultipleProtests: { type: Boolean, default: false },
        },
        ruleChange: {
            ruleChangeAlwaysVote: { type: Boolean, default: true },
            allowMultipleRuleChanges: { type: Boolean, default: true },
            ruleChangeExpiry: { type: String, default: "M" },
        },
        autoOpen: {
            auto: { type: Boolean, default: false },
            dateTime: { type: String, required: true },
        },
        autoClose: {
            auto: { type: Boolean, default: false },
            dateTime: { type: String, required: true },
        },
        audio: {
            enabled: { type: Boolean, default: false },
            auto: { type: Boolean, default: false },
            triggers: {
                open: [{ type: String }],
                close: [{ type: String }],
            },
        },
        wager: {
            allow: { type: Boolean, default: false },
            description: { type: String, default: "" },
            max: { type: Number },
            min: { type: Number },
            equal: { type: Boolean, default: false },
        },
    },
    champBadges: [{ type: mongoose_1.default.Schema.ObjectId, ref: "Badge" }],
    waitingList: [
        {
            user: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
            position: { type: Number, required: true },
        },
    ],
    history: {
        seasons: [{ type: String }],
        names: [
            {
                name: { type: String, required: true },
                created_at: { type: String, default: (0, moment_1.default)().format() },
            },
        ],
        rounds: [
            {
                round: { type: String, required: true },
                created_at: { type: String, default: (0, moment_1.default)().format() },
            },
        ],
        stats: {
            allTime: {
                mostPlayers: { type: Number, default: 0 },
                mostPoints: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    points: { type: Number, default: 0 },
                },
                mostBadgesGiven: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    badgesNum: { type: Number, default: 0 },
                },
                rarestBadgeGiven: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    badge: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                },
                mostWins: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    amount: { type: Number, default: 0 },
                },
                mostRunnerUp: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    amount: { type: Number, default: 0 },
                },
                bestWinStreak: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    amount: { type: Number, default: 0 },
                },
                bestPointsStreak: {
                    player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                    amount: { type: Number, default: 0 },
                },
            },
            seasons: [
                {
                    season: { type: String, required: true },
                    mostPlayers: { type: Number, default: 0 },
                    mostWins: {
                        player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                        amount: { type: Number, default: 0 },
                    },
                    mostRunnerUp: {
                        player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                        amount: { type: Number, default: 0 },
                    },
                    bestWinStreak: {
                        player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                        amount: { type: Number, default: 0 },
                    },
                    bestPointsStreak: {
                        player: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
                        amount: { type: Number, default: 0 },
                    },
                },
            ],
        },
    },
    created_at: { type: String, default: (0, moment_1.default)().format() },
    updated_at: { type: String, default: (0, moment_1.default)().format() },
});
const Champ = mongoose_1.default.model("Champ", champSchema);
exports.default = Champ;
//# sourceMappingURL=champ.js.map
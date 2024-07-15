"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const badge_1 = __importDefault(require("../../models/badge"));
const user_1 = __importDefault(require("../../models/user"));
const utility_1 = require("../../shared/utility");
const resolverErrors_1 = require("./resolverErrors");
const moment_1 = __importDefault(require("moment"));
const badgeOutcomes_1 = __importStar(require("../../shared/badgeOutcomes"));
const badgeResolvers = {
    newBadge: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { url, name, rarity, awardedHow, awardedDesc, zoom, championship } = args.badgeInput;
            const user = (yield user_1.default.findById(req._id));
            (0, resolverErrors_1.userErrors)(user);
            (0, resolverErrors_1.badgeURLErrors)(url);
            (0, resolverErrors_1.badgeNameErrors)(name);
            (0, resolverErrors_1.badgeAwardedHowErrors)(awardedHow);
            (0, resolverErrors_1.badgeAwardedDescErrors)(awardedHow, awardedDesc);
            (0, resolverErrors_1.badgeRarityErrors)(rarity);
            (0, resolverErrors_1.badgeZoomErrors)(zoom);
            (0, resolverErrors_1.badgeChampErrors)(championship);
            yield (0, resolverErrors_1.badgeDuplicateErrors)(args.badgeInput);
            const badge = new badge_1.default({
                url,
                name,
                rarity,
                awardedHow,
                awardedDesc,
                zoom,
                championship,
            }, (err) => {
                if (err)
                    throw new Error(err);
            });
            yield badge.save();
            return Object.assign(Object.assign({}, badge._doc), { tokens: JSON.stringify((0, utility_1.signTokens)(user)) });
        }
        catch (err) {
            throw err;
        }
    }),
    getBadgesByChamp: (_a, req_1) => __awaiter(void 0, [_a, req_1], void 0, function* ({ championship }, req) {
        try {
            const user = (yield user_1.default.findById(req._id));
            (0, resolverErrors_1.userErrors)(user);
            const badges = yield badge_1.default.find({ championship }).exec();
            return {
                array: badges,
                tokens: JSON.stringify((0, utility_1.signTokens)(user)),
            };
        }
        catch (err) {
            throw err;
        }
    }),
    updateBadge: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, url, name, rarity, awardedHow, awardedDesc, zoom } = args.updateBadgeInput;
            const user = (yield user_1.default.findById(req._id));
            (0, resolverErrors_1.userErrors)(user);
            (0, resolverErrors_1.badgeURLErrors)(url);
            (0, resolverErrors_1.badgeNameErrors)(name);
            (0, resolverErrors_1.badgeAwardedHowErrors)(awardedHow);
            (0, resolverErrors_1.badgeAwardedDescErrors)(awardedHow, awardedDesc);
            (0, resolverErrors_1.badgeRarityErrors)(rarity);
            (0, resolverErrors_1.badgeZoomErrors)(zoom);
            yield (0, resolverErrors_1.badgeDuplicateErrors)(args.updateBadgeInput);
            const badge = yield badge_1.default.findById(_id);
            if (!badge) {
                (0, resolverErrors_1.throwError)("updateBadge", badge, "No badge by that _id was found!");
                return args.updateBadgeInput;
            }
            badge.url = url;
            badge.name = name;
            badge.rarity = rarity;
            badge.awardedHow = awardedHow;
            badge.awardedDesc = (0, badgeOutcomes_1.findDesc)(badgeOutcomes_1.default, awardedHow);
            badge.zoom = zoom;
            badge.updated_at = (0, moment_1.default)().format();
            yield badge.save();
            return Object.assign(Object.assign({}, badge._doc), { tokens: JSON.stringify((0, utility_1.signTokens)(user)) });
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = badgeResolvers;
//# sourceMappingURL=badgeResolvers.js.map
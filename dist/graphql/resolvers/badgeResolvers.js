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
const badge_1 = __importDefault(require("../../models/badge"));
const user_1 = __importDefault(require("../../models/user"));
const utility_1 = require("../../shared/utility");
const resolverErrors_1 = require("./resolverErrors");
const badgeResolvers = {
    newBadge: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { url, name, rarity, awardedHow, awardedDesc, zoom, championship } = args.badgeInput;
            const user = (yield user_1.default.findById(req._id));
            (0, resolverErrors_1.userErrors)(user);
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
};
exports.default = badgeResolvers;
//# sourceMappingURL=badgeResolvers.js.map
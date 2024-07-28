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
const team_1 = __importDefault(require("../../models/team"));
const resolverErrors_1 = require("./resolverErrors");
const teamResolvers = {
    newTeam: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuth) {
            (0, resolverErrors_1.throwError)("newTeam", req.isAuth, "Not Authenticated!", 401);
        }
        try {
            const { url, name, driverGroups, drivers, stats } = args.teamInput;
            const team = new team_1.default({
                url,
                name,
                driverGroups,
                drivers,
                stats,
            }, (err) => {
                if (err)
                    throw new Error(err);
            });
            yield team.save();
            return Object.assign(Object.assign({}, team._doc), { tokens: req.tokens });
        }
        catch (err) {
            throw err;
        }
    }),
    getTeams: (_a, req_1) => __awaiter(void 0, [_a, req_1], void 0, function* ({}, req) {
        if (!req.isAuth) {
            (0, resolverErrors_1.throwError)("getTeams", req.isAuth, "Not Authenticated!", 401);
        }
        try {
            const teams = yield team_1.default.find().exec();
            return {
                array: teams,
                tokens: req.tokens,
            };
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = teamResolvers;
//# sourceMappingURL=teamResolvers.js.map
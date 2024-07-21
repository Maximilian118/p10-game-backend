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
const driver_1 = __importDefault(require("../../models/driver"));
const resolverErrors_1 = require("./resolverErrors");
const driverResolvers = {
    newDriver: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuth) {
            (0, resolverErrors_1.throwError)("newDriver", req.isAuth, "Not Authenticated!", 401);
        }
        try {
            const { url, name, driverGroups, stats } = args.driverInput;
            const driver = new driver_1.default({
                url,
                name,
                driverGroups,
                stats,
            }, (err) => {
                if (err)
                    throw new Error(err);
            });
            yield driver.save();
            return Object.assign(Object.assign({}, driver._doc), { tokens: req.tokens });
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = driverResolvers;
//# sourceMappingURL=driverResolvers.js.map
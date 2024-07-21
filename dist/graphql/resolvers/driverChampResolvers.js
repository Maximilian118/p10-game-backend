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
const driverGroup_1 = __importDefault(require("../../models/driverGroup"));
const resolverErrors_1 = require("./resolverErrors");
const driverGroupResolvers = {
    newDriverGroup: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.isAuth) {
            (0, resolverErrors_1.throwError)("newDriver", req.isAuth, "Not Authenticated!", 401);
        }
        try {
            const { url, name, championships, drivers } = args.driverGroupInput;
            const driverGroup = new driverGroup_1.default({
                url,
                name,
                championships,
                drivers,
            }, (err) => {
                if (err)
                    throw new Error(err);
            });
            yield driverGroup.save();
            return Object.assign(Object.assign({}, driverGroup._doc), { tokens: req.tokens });
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = driverGroupResolvers;
//# sourceMappingURL=driverChampResolvers.js.map
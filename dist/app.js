"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const utility_1 = require("./shared/utility");
const schemas_1 = __importDefault(require("./graphql/schemas/schemas"));
const resolvers_1 = __importDefault(require("./graphql/resolvers/resolvers"));
const corsHandler_1 = __importDefault(require("./middleware/corsHandler"));
const auth_1 = __importDefault(require("./middleware/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "1mb" }));
app.use(corsHandler_1.default);
app.use(auth_1.default);
app.use("/graphql", (req, res) => {
    (0, express_graphql_1.graphqlHTTP)({
        schema: schemas_1.default,
        rootValue: resolvers_1.default,
        graphiql: true,
        customFormatErrorFn(error) {
            return (0, utility_1.formatErrHandler)(error);
        },
    })(req, res);
});
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/p10_game")
    .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map
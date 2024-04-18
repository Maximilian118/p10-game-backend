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
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const resolverErrors_1 = require("./resolverErrors");
const utility_1 = require("../../shared/utility");
const bucketResolvers = {
    signS3: (_a) => __awaiter(void 0, [_a], void 0, function* ({ filename }) {
        try {
            yield (0, resolverErrors_1.nameErrors)(filename.split("/")[0]);
            (0, resolverErrors_1.imageErrors)("Resolver: signS3", filename);
            const bucket = process.env.AWS_BUCKET;
            const region = process.env.AWS_REGION;
            const access_key = process.env.AWS_ACCESS_KEY_ID;
            const secret_key = process.env.AWS_SECRET_ACCESS_KEY;
            if (!bucket || !region || !access_key || !secret_key) {
                throw (0, resolverErrors_1.throwError)("Resovler: signS3", null, "Could not retrieve environment variables!");
            }
            const client = new client_s3_1.S3Client({
                region,
                credentials: {
                    accessKeyId: access_key,
                    secretAccessKey: secret_key,
                },
            });
            const params = {
                Bucket: bucket,
                Key: filename,
                ACL: "public-read",
            };
            if (yield (0, utility_1.isDuplicateS3)(client, params)) {
                (0, resolverErrors_1.throwError)("Resolver: signS3", filename, "Diplicate Image.");
            }
            const command = new client_s3_1.PutObjectCommand(params);
            const signedRequest = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 60 });
            const url = `http://${bucket}.s3.${region}.amazonaws.com/${filename}`;
            return {
                signedRequest,
                url,
            };
        }
        catch (err) {
            throw err;
        }
    }),
};
exports.default = bucketResolvers;
//# sourceMappingURL=bucketResolvers.js.map
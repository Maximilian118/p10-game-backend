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
const bucketResolvers = {
    signS3: (_a) => __awaiter(void 0, [_a], void 0, function* ({ filename }) {
        try {
            const access_key = process.env.AWS_ACCESS_KEY_ID;
            const secret_key = process.env.AWS_SECRET_ACCESS_KEY;
            const client = new client_s3_1.S3Client({
                region: "eu-west-2",
                credentials: {
                    accessKeyId: access_key ? access_key : "",
                    secretAccessKey: secret_key ? secret_key : "",
                },
            });
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: filename,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const signedRequest = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 60 });
            const url = `http://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${filename}`;
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
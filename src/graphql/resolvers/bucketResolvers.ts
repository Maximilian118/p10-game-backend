import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { imageErrors, throwError } from "./resolverErrors"
import { isDuplicateS3 } from "../../shared/utility"

const bucketResolvers = {
  signS3: async ({ filename }: { filename: string }) => {
    try {
      imageErrors("Resolver: signS3", filename)

      const bucket = process.env.AWS_BUCKET
      const region = process.env.AWS_REGION
      const access_key = process.env.AWS_ACCESS_KEY_ID
      const secret_key = process.env.AWS_SECRET_ACCESS_KEY

      if (!bucket || !region || !access_key || !secret_key) {
        throw throwError("Resovler: signS3", null, "Could not retrieve environment variables!")
      }

      const client = new S3Client({
        region,
        credentials: {
          accessKeyId: access_key,
          secretAccessKey: secret_key,
        },
      })

      const params: PutObjectCommandInput = {
        Bucket: bucket,
        Key: filename,
        ACL: "public-read",
      }

      if (await isDuplicateS3(client, params)) {
        throwError("Resolver: signS3", filename, "Diplicate Image.")
      }

      const command = new PutObjectCommand(params)

      const signedRequest = await getSignedUrl(client, command, { expiresIn: 60 }) // prettier-ignore
      const url = `http://${bucket}.s3.${region}.amazonaws.com/${filename}`

      return {
        signedRequest,
        url,
      }
    } catch (err) {
      throw err
    }
  },
}

export default bucketResolvers

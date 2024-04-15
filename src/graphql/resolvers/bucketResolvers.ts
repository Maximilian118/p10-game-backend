import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const bucketResolvers = {
  signS3: async ({ filename }: { filename: string }) => {
    try {
      const access_key = process.env.AWS_ACCESS_KEY_ID
      const secret_key = process.env.AWS_SECRET_ACCESS_KEY

      const client = new S3Client({
        region: "eu-west-2",
        credentials: {
          accessKeyId: access_key ? access_key : "",
          secretAccessKey: secret_key ? secret_key : "",
        },
      })

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: filename,
      }

      const command = new PutObjectCommand(params)

      const signedRequest = await getSignedUrl(client, command, { expiresIn: 60 }) // prettier-ignore
      const url = `http://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${filename}`

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

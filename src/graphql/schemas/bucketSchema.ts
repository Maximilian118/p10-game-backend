const bucketSchema = `
  type S3Payload {
    signedRequest: String!,
    url: String!,
    tokens: String,
  }
`

export default bucketSchema

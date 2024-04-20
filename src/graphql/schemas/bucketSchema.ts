const bucketSchema = `
  type S3Payload {
    signedRequest: String!
    url: String!
    duplicate: Boolean!
  }
`

export default bucketSchema

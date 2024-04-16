const bucketSchema = `
  type S3Payload {
    signedRequest: String!
    url: String!
  }
`

export default bucketSchema

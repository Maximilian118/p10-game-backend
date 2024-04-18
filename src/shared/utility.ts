import jwt from "jsonwebtoken"
import { genSalt, hash, compare } from "bcryptjs"
import { userType } from "../models/user"
import { GraphQLError, SourceLocation } from "graphql"
import { HeadObjectCommand, PutObjectAclCommandInput, S3Client } from "@aws-sdk/client-s3"

// Sign Tokens with JWT.
export const signTokens = (user: userType) => {
  const access_token = jwt.sign(
    {
      _id: user._id,
    },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: "15m" },
  )

  const refresh_token = jwt.sign(
    {
      _id: user._id,
      refresh_count: user.refresh_count,
    },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: "7d" },
  )

  return {
    access_token,
    refresh_token,
  }
}

// Hash a password.
export const hashPass = async (pass: string): Promise<string> => {
  const s = await genSalt(Number(process.env.PASSWORD_SALT))
  return hash(pass, s)
}

// Authenticate a password.
export const comparePass = async (pass: string, hashedPass: string): Promise<boolean> => {
  return await compare(pass, hashedPass)
}

// Check if a string has proper JSON interchange format.
const isJSON = (str: string) => {
  if (typeof str !== "string") return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    return type === "[object Object]" || type === "[object Array]"
  } catch (err) {
    return false
  }
}

// Receives error string, parses it, then returns a formatted error.
// prettier-ignore
export const formatErrHandler = ( error: GraphQLError ): {
  type: string
  message: string
  code: number
  value: any
  locations: readonly SourceLocation[]
  path: readonly (string | number)[]
} => {
  if (isJSON(error.message)) {
    const err = JSON.parse(error.message)

    return {
      type: err.type ? err.type : "",
      message: err.message ? err.message : "",
      code: err.code ? err.code : 400,
      value: err.value ? err.value : null,
      locations: error.locations ? error.locations : [],
      path: error.path ? error.path : [],
    }
  } else {
    return {
      type: "Unknown",
      message: error.message ? error.message : "",
      code: 400,
      value: null,
      locations: error.locations ? error.locations : [],
      path: error.path ? error.path : [],
    }
  }
}

// Check if passed key is already uploaded to AWS S3.
export const isDuplicateS3 = async (
  client: S3Client,
  params: PutObjectAclCommandInput,
): Promise<boolean> => {
  try {
    await client.send(new HeadObjectCommand(params))
    return true
  } catch (error) {
    return false
  }
}

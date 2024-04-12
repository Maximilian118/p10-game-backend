import jwt from "jsonwebtoken"
import { genSalt, hash, compare } from "bcryptjs"
import { userType } from "../models/user"

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
export const hashPass = async (pass: string) => {
  const s = await genSalt(Number(process.env.PASSWORD_SALT))
  return hash(pass, s)
}

// Authenticate a password.
export const comparePass = async (pass: string, hashedPass: string) => {
  return await compare(pass, hashedPass)
}

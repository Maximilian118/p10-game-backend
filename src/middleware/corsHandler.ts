import { RequestHandler } from "express"

const corsHandler: RequestHandler = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, accessToken, refreshToken") // prettier-ignore
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }

  next()
}

export default corsHandler

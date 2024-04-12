import express from "express"
import errorHandler from "./middleware/errorHandler"
import corsHandler from "./middleware/corsHandler"
import { createHandler } from "graphql-http"

import mongoose from "mongoose"

// Import Graphql Schema and Resolvers.
import Schema from "./graphql/schemas/schemas"
import Resolvers from "./graphql/resolvers/resolvers"

// Import token authentication middleware.
// const auth = require("./middleware/auth")

// Initialise express.
const app = express()
app.use(express.json({ limit: "1mb" }))

// Handle CORS Errors.
app.use(corsHandler)

// Make token authentication middleware available in all reducers by passing req.
// app.use(auth)

// Initialise Graphql with the /graphql endpoint.
app.use(
  "/graphql",
  createHandler({
    schema: Schema,
    rootValue: Resolvers,
  }),
)

// Error handler middleware.
app.use(errorHandler)

// Connect to a local MongoDB Database. If no port is specified in CLI use port 3001.
mongoose
  .connect("mongodb://127.0.0.1:27017/p10_game")
  .then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  })
  .catch((err: string) => {
    console.log(err)
  })

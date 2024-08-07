import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import { formatErrHandler } from "./shared/utility"

// Import Graphql Schema and Resolvers.
import Schema from "./graphql/schemas/schemas"
import Resolvers from "./graphql/resolvers/resolvers"

// Import middleware.
import corsHandler from "./middleware/corsHandler"
import auth from "./middleware/auth"

// Initialise express.
const app = express()

// Maximum request body size.
app.use(express.json({ limit: "1mb" }))

// Handle CORS Errors.
app.use(corsHandler)

// Make token authentication middleware available in all reducers by passing req.
app.use(auth as any)

// Initialise GraphQL.
// Function takes a method to shape errors.
app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: Schema,
    rootValue: Resolvers,
    graphiql: true,
    customFormatErrorFn(error) {
      return formatErrHandler(error)
    },
  })(req, res)
})

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

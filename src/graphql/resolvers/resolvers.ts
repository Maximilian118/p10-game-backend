import userResolvers from "./userResolvers"
import bucketResolvers from "./bucketResolvers"

const Resolvers = {
  ...userResolvers,
  ...bucketResolvers,
}

export default Resolvers

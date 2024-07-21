import userResolvers from "./userResolvers"
import bucketResolvers from "./bucketResolvers"
import badgeResolvers from "./badgeResolvers"
import driverGroupResolvers from "./driverGroupResolvers"
import driverResolvers from "./driverResolvers"

const Resolvers = {
  ...userResolvers,
  ...bucketResolvers,
  ...badgeResolvers,
  ...driverGroupResolvers,
  ...driverResolvers,
}

export default Resolvers

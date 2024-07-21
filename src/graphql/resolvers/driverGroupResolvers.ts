import { AuthRequest } from "../../middleware/auth"
import DriverGroup, { driverGroupType } from "../../models/driverGroup"
import { throwError } from "./resolverErrors"

const driverGroupResolvers = {
  // prettier-ignore
  newDriverGroup: async (args: { driverGroupInput: driverGroupType }, req: AuthRequest): Promise<driverGroupType> => {
    if (!req.isAuth) {
      throwError("newDriver", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      const { url, name, championships, drivers } = args.driverGroupInput

      // Check for errors.

      // Create a new user DB object.
      const driverGroup = new DriverGroup(
        {
          url,
          name,
          championships,
          drivers,
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      // Save the new user to the DB.
      await driverGroup.save()

      // Return the new user with tokens.
      return {
        ...driverGroup._doc,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
  getDriverGroups: async (
    {},
    req: AuthRequest,
  ): Promise<{
    array: driverGroupType[]
    tokens: string[]
  }> => {
    if (!req.isAuth) {
      throwError("getDriverGroups", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      // Find all driverGroups.
      const driverGroups = await DriverGroup.find().exec()

      // Return the new user with tokens.
      return {
        array: driverGroups,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
}

export default driverGroupResolvers

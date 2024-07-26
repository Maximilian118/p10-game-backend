import { AuthRequest } from "../../middleware/auth"
import Driver, { driverType } from "../../models/driver"
import { throwError } from "./resolverErrors"

const driverResolvers = {
  newDriver: async (args: { driverInput: driverType }, req: AuthRequest): Promise<driverType> => {
    if (!req.isAuth) {
      throwError("newDriver", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      const { url, name, driverGroups, stats } = args.driverInput

      // Check for errors.
      // NEW DRIVER HAS TO BELONG TO AT LEAST ONE DRIVERGROUP. CAN NOT BE NULL.

      // Create a new user DB object.
      const driver = new Driver(
        {
          url,
          name,
          driverGroups,
          stats,
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      // Save the new user to the DB.
      await driver.save()

      // Return the new user with tokens.
      return {
        ...driver._doc,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
  getDrivers: async (
    {},
    req: AuthRequest,
  ): Promise<{
    array: driverType[]
    tokens: string[]
  }> => {
    if (!req.isAuth) {
      throwError("getDrivers", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      // Find all drivers.
      const drivers = await Driver.find().exec()

      // Return the new user with tokens.
      return {
        array: drivers,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
}

export default driverResolvers

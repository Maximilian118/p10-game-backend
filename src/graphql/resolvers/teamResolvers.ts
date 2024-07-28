import { AuthRequest } from "../../middleware/auth"
import Team, { teamType } from "../../models/team"
import { throwError } from "./resolverErrors"

const teamResolvers = {
  newTeam: async (args: { teamInput: teamType }, req: AuthRequest): Promise<teamType> => {
    if (!req.isAuth) {
      throwError("newTeam", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      const { url, name, driverGroups, drivers, stats } = args.teamInput

      // Check for errors.

      // Create a new user DB object.
      const team = new Team(
        {
          url,
          name,
          driverGroups,
          drivers,
          stats,
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      // Save the new user to the DB.
      await team.save()

      // Return the new team with tokens.
      return {
        ...team._doc,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
  getTeams: async (
    {},
    req: AuthRequest,
  ): Promise<{
    array: teamType[]
    tokens: string[]
  }> => {
    if (!req.isAuth) {
      throwError("getTeams", req.isAuth, "Not Authenticated!", 401)
    }

    try {
      // Find all teams.
      const teams = await Team.find().exec()

      // Return all teams with tokens.
      return {
        array: teams,
        tokens: req.tokens,
      }
    } catch (err) {
      throw err
    }
  },
}

export default teamResolvers

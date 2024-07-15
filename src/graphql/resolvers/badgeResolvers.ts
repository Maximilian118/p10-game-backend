import { AuthRequest } from "../../middleware/auth"
import Badge, { badgeType } from "../../models/badge"
import User, { userTypeMongo } from "../../models/user"
import { signTokens } from "../../shared/utility"
import { badgeErrors, badgeNameErrors, userErrors } from "./resolverErrors"

const badgeResolvers = {
  newBadge: async (args: { badgeInput: badgeType }, req: AuthRequest): Promise<badgeType> => {
    try {
      const { url, name, rarity, awardedHow, awardedDesc, zoom, championship } = args.badgeInput
      const user = (await User.findById(req._id)) as userTypeMongo

      // Check for errors.
      userErrors(user)
      badgeNameErrors(name)
      badgeErrors(args.badgeInput)

      // Create a new user DB object.
      const badge = new Badge(
        {
          url,
          name,
          rarity,
          awardedHow,
          awardedDesc,
          zoom,
          championship,
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      // Save the new user to the DB.
      await badge.save()

      // Return the new user with tokens.
      return {
        ...badge._doc,
        tokens: JSON.stringify(signTokens(user)),
      }
    } catch (err) {
      throw err
    }
  },
  getBadgesByChamp: async (
    { championship }: { championship: string | null },
    req: AuthRequest,
  ): Promise<{
    array: badgeType[]
    tokens: string
  }> => {
    try {
      const user = (await User.findById(req._id)) as userTypeMongo

      // Check for errors.
      userErrors(user)

      // Find badges by championship value.
      const badges = await Badge.find({ championship } as { championship: string }).exec()

      // Return the new user with tokens.
      return {
        array: badges,
        tokens: JSON.stringify(signTokens(user)),
      }
    } catch (err) {
      throw err
    }
  },
}

export default badgeResolvers

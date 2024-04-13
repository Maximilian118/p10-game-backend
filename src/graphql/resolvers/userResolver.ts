import moment from "moment"
import User, { userInputType, userType } from "../../models/user"
import { hashPass, resolverError, signTokens } from "../../shared/utility"
import { GraphQLError } from "graphql"

const userResolver = {
  createUser: async (args: { userInput: userInputType }): Promise<userType> => {
    try {
      const { name, email, password, icon, profile_picture } = args.userInput

      if (name) {
        throw new GraphQLError(
          resolverError({
            type: "name",
            message: "Please enter a name",
            code: 400,
            value: name,
          }),
        )
      }

      const user = new User(
        {
          name,
          email,
          icon,
          profile_picture,
          password: await hashPass(password as string),
          created_at: moment().format(),
          updated_at: moment().format(),
          logged_in_at: moment().format(),
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      await user.save()

      return {
        ...user._doc,
        tokens: JSON.stringify(signTokens(user)),
        password: null,
      }
    } catch (err) {
      throw err
    }
  },
}

export default userResolver

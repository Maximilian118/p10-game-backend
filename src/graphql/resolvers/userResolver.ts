import moment from "moment"
import User, { userInputType, userType } from "../../models/user"
import { hashPass, signTokens } from "../../shared/utility"

import {
  emailErrors,
  nameErrors,
  passConfirmErrors,
  passwordErrors,
} from "./resolverErrors"

const userResolver = {
  createUser: async (args: { userInput: userInputType }): Promise<userType> => {
    try {
      const { name, email, password, passConfirm, icon, profile_picture } =
        args.userInput

      nameErrors(name)
      await emailErrors(email)
      passwordErrors(password, passConfirm)
      passConfirmErrors(passConfirm, password)

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

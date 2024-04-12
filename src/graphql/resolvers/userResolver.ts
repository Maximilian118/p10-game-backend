import moment from "moment"
import User, { userInputType } from "../../models/user"
import { hashPass, signTokens } from "../../shared/utility"

const userResolver = {
  createUser: async (args: { userInput: userInputType }) => {
    console.log("createUser")
    try {
      const { name, email, password, passConfirm, icon, profile_picture } =
        args.userInput
      if (!name) {
        throw new Error(
          JSON.stringify({
            type: "name",
            message: "Please enter your name. Feel free to make one up!",
          }),
        )
      } else if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
        throw new Error(
          JSON.stringify({
            type: "name",
            message:
              "Your name cannot contain numbers or special characters other than hyphens and apostrophes.",
          }),
        )
      }
      if (!email) {
        throw new Error("Please enter an email address.")
      } else if (await User.findOne({ email })) {
        throw new Error(
          JSON.stringify({
            type: "email",
            message: "A User by that email already exists!",
          }),
        )
      } else if (
        !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          email,
        )
      ) {
        throw new Error(
          JSON.stringify({
            type: "email",
            message: "Please enter a valid email address.",
          }),
        )
      }
      if (!password) {
        throw new Error(
          JSON.stringify({
            type: "password",
            message: "Please enter a password.",
          }),
        )
      } else if (!/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,20}$/.test(password)) {
        throw new Error(
          JSON.stringify({
            type: "password",
            message:
              "Your password must have at least one letter and one number. Minimum 8 characters.",
          }),
        )
      }
      if (!passConfirm) {
        throw new Error(
          JSON.stringify({
            type: "passConfirm",
            message: "Please enter your password confirmation.",
          }),
        )
      } else if (password !== passConfirm) {
        throw new Error(
          JSON.stringify({
            type: "passConfirm",
            message: "Passwords do not match.",
          }),
        )
      }

      const user = new User(
        {
          name,
          email,
          icon,
          profile_picture,
          password: await hashPass(password),
          created_at: moment().format(),
          updated_at: moment().format(),
          logged_in_at: moment().format(),
        },
        (err: string) => {
          if (err) throw new Error(err)
        },
      )

      await user.save()
      console.log(`${email} created an account.`)
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

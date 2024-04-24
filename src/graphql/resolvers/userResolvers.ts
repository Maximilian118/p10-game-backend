import moment from "moment"
import User, { userInputType, userType, userTypeMongo } from "../../models/user"
import { comparePass, hashPass, signTokens } from "../../shared/utility"
import generator from "generate-password"
import nodemailer from "nodemailer"

import {
  emailErrors,
  iconErrors,
  nameErrors,
  passConfirmErrors,
  passwordErrors,
  profilePictureErrors,
  throwError,
  userErrors,
} from "./resolverErrors"

const userResolvers = {
  createUser: async (args: { userInput: userInputType }): Promise<userType> => {
    try {
      const { name, email, password, passConfirm, icon, profile_picture } = args.userInput

      // Check for errors.
      await nameErrors(name)
      await emailErrors(email)
      passwordErrors(password, passConfirm)
      passConfirmErrors(passConfirm, password)
      iconErrors(icon, profile_picture)
      profilePictureErrors(profile_picture, icon)

      // Create a new user DB object.
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

      // Save the new user to the DB.
      await user.save()

      // Return the new user with tokens.
      return {
        ...user._doc,
        tokens: JSON.stringify(signTokens(user)),
        password: null,
      }
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }: userInputType): Promise<userType> => {
    try {
      const user = (await User.findOne({ email })) as userTypeMongo
      userErrors(user)

      if (!password) {
        throwError("password", user, "No password entry.")
      } else if (user.password && !(await comparePass(password, user.password))) {
        throwError("password", user, "Incorrect password.")
      }

      user.logged_in_at = moment().format()
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
  forgot: async ({ email }: { email: string }): Promise<string> => {
    try {
      const user = (await User.findOne({ email })) as userTypeMongo
      userErrors(user)

      const randomPass = generator.generate({
        length: 10,
        numbers: true,
        strict: true,
      })

      const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: 465,
        secure: true, // use SSL.
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      })

      transporter.verify((err) => {
        if (err) {
          console.error(err)
        }
      })

      const mail = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "P10-Game Password Reset",
        text: `
        Your password is now: 
        ${randomPass}

        If you did not expect this email contact maxcrosby118@gmail.com immediately! 🚨
        `,
      }

      user.password = await hashPass(randomPass as string)
      user.updated_at = moment().format()
      await user.save()

      transporter.sendMail(mail, (err) => {
        if (err) {
          console.error(err)
        }
      })

      return "Forgot request submitted."
    } catch (err) {
      throw err
    }
  },
}

export default userResolvers

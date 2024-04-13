import { GraphQLError } from "graphql"
import User from "../../models/user"

const throwError = (
  type: string,
  value: any,
  message: `${string}.` | `${string}!` | `${string}?`,
  code?: number,
): GraphQLError => {
  throw new GraphQLError(
    JSON.stringify({
      type: type.toLowerCase(),
      value,
      message,
      code: code ? code : 400,
    }),
  )
}

export const nameErrors = (name: string): void => {
  const type = "name"

  if (!name) {
    throwError(type, name, "Please enter a name.")
  }

  if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
    if (name.length > 30) {
      throwError(type, name, "30 characters maximum.")
    }

    throwError(type, name, "No numbers or special characters.")
  }
}

export const emailErrors = async (email: string): Promise<void> => {
  const type = "email"

  if (!email) {
    throwError(type, email, "Please enter an email.")
  }

  if (
    !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
  ) {
    throwError(type, email, "Please enter a valid email address.")
  }

  if (await User.findOne({ email })) {
    throwError(type, email, "A user by that email already exists!")
  }
}

export const passwordErrors = (
  password: string | null,
  passConfirm: string,
): void => {
  const type = "password"

  if (!password) {
    throwError(type, password, "Please enter a password.")
  } else {
    if (password.length <= 8) {
      throwError(type, password, "Minimum 8 characters.")
    }

    if (password.length >= 40) {
      throwError(type, password, "Maximum 40 characters.")
    }

    if (
      !/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(
        password,
      )
    ) {
      throwError(type, password, "At least one letter and one number.")
    }

    if (password !== passConfirm) {
      throwError(type, password, "Passwords do not match.")
    }
  }
}

export const passConfirmErrors = (
  passConfirm: string,
  password: string | null,
): void => {
  const type = "passConfirm"

  if (!passConfirm) {
    throwError(type, password, "Please enter your password confirmation.")
  }

  if (passConfirm !== password) {
    throwError(type, password, "Passwords do not match.")
  }
}

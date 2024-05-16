import { GraphQLError } from "graphql"
import User, { userType } from "../../models/user"

type punctuation = `${string}.` | `${string}!` | `${string}?`

export const throwError = (
  type: string,
  value: any,
  message: punctuation,
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

export const nameErrors = async (name: string): Promise<void> => {
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

  const user = await User.findOne({ name })

  if (user) {
    throwError(type, name, "This username is taken.")
  }
}

export const emailErrors = async (email: string, user?: userType): Promise<void> => {
  const type = "email"

  if (!email) {
    throwError(type, email, "Please enter an email.")
  }

  if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
    throwError(type, email, "Please enter a valid email address.")
  }

  if (user) {
    if (email === user.email) {
      throwError(type, email, "This is already your email address.")
    }
  }

  if (await User.findOne({ email })) {
    throwError(type, email, "A user by that email already exists!")
  }
}

export const passwordErrors = (password: string | null, passConfirm: string): void => {
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

    if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(password)) {
      throwError(type, password, "At least one letter and one number.")
    }

    if (password !== passConfirm) {
      throwError(type, password, "Passwords do not match.")
    }
  }
}

export const passConfirmErrors = (passConfirm: string, password: string | null): void => {
  const type = "passConfirm"

  if (!passConfirm) {
    throwError(type, password, "Please enter your password confirmation.")
  }

  if (passConfirm !== password) {
    throwError(type, password, "Passwords do not match.")
  }
}

export const iconErrors = (
  icon: string | undefined,
  profile_picture: string | undefined,
  user?: userType,
): void => {
  const type = "icon"

  if (icon) {
    if (
      !/^http:\/\/[a-z0-9-.]+\/[a-z0-9-]+\/icon\/[a-z0-9-]+$/i.test(icon) // prettier-ignore
    ) {
      throwError(type, icon, "Icon URL is not valid... Tricky one.")
    }
  }

  if (icon && !profile_picture) {
    throwError(type, icon, "Got Icon but no Profile Picture?!")
  }

  if (icon && user) {
    if (icon === user.icon) {
      throwError(type, icon, "Duplicate Icon.")
    }
  }
}

export const profilePictureErrors = (
  profile_picture: string | undefined,
  icon: string | undefined,
  user?: userType,
): void => {
  const type = "profile_picture"

  if (profile_picture) {
    if (
      !/^http:\/\/[a-z0-9-.]+\/[a-z0-9-]+\/profile-picture\/[a-z0-9-]+$/i.test(profile_picture) // prettier-ignore
    ) {
      throwError(type, profile_picture, "Profile Picture URL is not valid... Tricky one.")
    }
  }

  if (profile_picture && !icon) {
    throwError(type, icon, "Got Profile Picture but no Icon?!")
  }

  if (profile_picture && user) {
    if (profile_picture === user.profile_picture) {
      throwError(type, profile_picture, "Duplicate Profile Picture.")
    }
  }
}

export const imageErrors = (type: string, value: string): void => {
  if (!/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/i.test(value)) {
    throwError(type, value, "Image file name is not valid.")
  }
}

export const userErrors = (user?: userType): void => {
  const type = "email"

  if (!user) {
    throwError(type, user, "Account not found!")
  }
}

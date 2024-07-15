import { GraphQLError } from "graphql"
import User, { userType } from "../../models/user"
import Badge, { badgeType } from "../../models/badge"

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

export const nameErrors = async (name: string, user?: userType): Promise<void> => {
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

  if (user && name === user.name) {
    throwError(type, name, "This is already your username.")
  }

  const dbUser = await User.findOne({ name })

  if (dbUser) {
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

export const badgeNameErrors = (badgeName: string): void => {
  const type = "badgeName"

  if (!badgeName) {
    throwError(type, badgeName, "Please enter a name.")
  }

  if (!/^[a-zA-Z\s-']{1,15}$/.test(badgeName)) {
    if (badgeName.length > 15) {
      throwError(type, badgeName, "15 characters maximum.")
    }

    throwError(type, badgeName, "No numbers or special characters.")
  }
}

export const badgeErrors = async (badge: badgeType): Promise<void> => {
  const type = "badge"

  if (!badge.championship) {
    throwError(type, badge, "You must pass a championship.")
  }

  if (!badge.url) {
    throwError(type, badge, "You must pass an image URL.")
  }

  if (!badge.name) {
    throwError(type, badge, "Please enter a name.")
  }

  if (!badge.awardedHow) {
    throwError(type, badge, "Please enter how this badge should be earned.")
  }

  if (!badge.awardedDesc) {
    throwError(type, badge, "Please describe how this badge should be earned.")
  }

  if (!badge.rarity) {
    throwError(type, badge, "Please enter a rarity for the badge.")
  }

  // Find badges by championship value and check for duplicates.
  const badges = await Badge.find({ championship: badge.championship }).exec() // NEED TO FINISH.
  console.log(badges)
}

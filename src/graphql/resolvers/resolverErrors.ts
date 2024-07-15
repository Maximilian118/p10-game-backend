import { GraphQLError } from "graphql"
import User, { userType } from "../../models/user"
import Badge, { badgeType } from "../../models/badge"
import { ObjectId } from "mongodb"
import badgeRewardOutcomes, { findDesc, findDescs, findHows } from "../../shared/badgeOutcomes"

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

  if (badgeName.length > 30) {
    throwError(type, badgeName, "30 characters maximum.")
  }
}

export const badgeChampErrors = (championship: ObjectId | null): void => {
  const type = "badge"

  if (!championship) {
    throwError(type, championship, "You must pass a championship _id.")
  }
}

export const badgeURLErrors = (url: string): void => {
  const type = "badge"

  if (!url) {
    throwError(type, url, "You must pass an image URL.")
  }
}

export const badgeAwardedHowErrors = (awardedHow: string): void => {
  const type = "badge"

  if (!awardedHow) {
    throwError(type, awardedHow, "Please enter how this badge should be earned.")
  }

  if (findHows(badgeRewardOutcomes, awardedHow).length === 0) {
    throwError(type, awardedHow, "The passed 'awarded for' outcome does not exist. Curious...")
  }
}

export const badgeAwardedDescErrors = (awardedHow: string, awardedDesc: string): void => {
  const type = "badge"

  if (!awardedHow) {
    throwError(type, awardedHow, "Please enter how this badge should be earned.")
  }

  if (findHows(badgeRewardOutcomes, awardedHow).length === 0) {
    throwError(type, awardedHow, "The passed 'awarded for' outcome does not exist. Curious...")
  }

  if (!awardedDesc) {
    throwError(type, awardedDesc, "Please describe how this badge should be earned.")
  }

  if (findDescs(badgeRewardOutcomes, awardedDesc).length === 0) {
    throwError(
      type,
      awardedHow,
      "The passed 'awarded for' outcome description does not exist. Curious...",
    )
  }
}

export const badgeRarityErrors = (rarity: number): void => {
  const type = "badge"

  if (rarity === null || typeof rarity === "undefined") {
    throwError(type, rarity, "Please enter a rarity for the badge.")
  }

  if (typeof rarity !== "number") {
    throwError(type, rarity, "Rarity must be a number.")
  }
}

export const badgeZoomErrors = (zoom: number): void => {
  const type = "badge"

  if (zoom === null || typeof zoom === "undefined") {
    throwError(type, zoom, "Please enter a zoom level for the badge.")
  }

  if (typeof zoom !== "number") {
    throwError(type, zoom, "Zoom must be a number.")
  }
}

export const badgeDuplicateErrors = async (badge: badgeType): Promise<void> => {
  const type = "badge"

  // Find badges by championship value.
  const dbBadges = await Badge.find({ championship: badge.championship }).exec()
  // Remove the targeted badge from the array.
  const badges = dbBadges.filter((b: badgeType) => b._id === badge._id)
  // Loop through all of the badges in the DB for this championship and check if the badge has any duplicate values.
  badges.forEach((b: badgeType) => {
    if (b.name === badge.name) {
      throwError(type, badge, "A badge of that name already exists for this championship.")
    }

    if (b.url === badge.url) {
      throwError(type, badge, "A badge with that URL already exists for this championship.")
    }
    // prettier-ignore
    if (b.awardedHow === badge.awardedHow) {
      throwError(type, badge, "A badge with that 'Awarded for' already exists for this championship.")
    }

    if (b.awardedDesc === badge.awardedDesc) {
      throwError(type, badge, "A badge with that description already exists for this championship.")
    }
    // prettier-ignore
    if (findDesc(badgeRewardOutcomes, badge.awardedHow) !== badge.awardedDesc) {
      throwError(type, badge, "The description provided does not match the selected 'Awarded for' field. Curious... Very curious...")
    }
  })
}

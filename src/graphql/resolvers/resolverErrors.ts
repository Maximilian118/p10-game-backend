import { GraphQLError } from "graphql"

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

export const nameErrors = (name: string) => {
  const value = "name"

  if (!name) {
    throwError(value, name, "Please enter a name.")
  }

  if (!/^[a-zA-Z\s-']{1,30}$/.test(name)) {
    if (name.length > 30) {
      throwError(value, name, "30 characters maximum.")
    }

    throwError(value, name, "No numbers or special characters.")
  }
}

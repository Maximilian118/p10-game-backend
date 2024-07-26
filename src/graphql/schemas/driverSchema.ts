const driverSchema = `
  type Stats {
    heightCM: Int!
    weightKG: Int!
    age: Int!
    moustache: Boolean!
    mullet: Boolean!
  }

  type Driver {
    _id: ID!
    url: String!
    name: String!
    driverGroups: [String!]
    stats: Stats!
    created_at: String!
    updated_at: String!
    tokens: [String!]
  }

  type Drivers {
    array: [Driver!]!
    tokens: [String!]
  }

  input statsInput {
    heightCM: Int!
    weightKG: Int!
    age: Int!
    moustache: Boolean!
    mullet: Boolean!
  }

  input driverInput {
    url: String!
    name: String!
    driverGroups: [String!]
    stats: statsInput!
  }
`
export default driverSchema

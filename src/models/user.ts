import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"
import { badgeType } from "./badge"

export interface userInputType {
  name: string
  email: string
  password: string | null
  passConfirm: string
  icon?: string
  profile_picture?: string
}

export interface userType extends userInputType {
  _id: ObjectId
  tokens: string
  championships: object[]
  badges: badgeType[]
  permissions: {
    admin: boolean
    adjudicator: boolean
    guest: boolean
  }
  refresh_count: number
  logged_in_at: string
  created_at: string
  updated_at: string
  _doc: userType
}

export interface userTypeMongo extends userType {
  save: () => Promise<{}>
}

const userSchema = new mongoose.Schema<userType>({
  name: { type: String, required: true }, // User Name.
  email: { type: String, required: true }, // User Email.
  password: { type: String, required: false, min: 8 }, // User encryptied password.
  icon: { type: String, required: false, default: "" }, // User Icon. Same image as Profile Picture but compressed to aprox 0.05mb.
  profile_picture: { type: String, required: false, default: "" }, // User Profile Picture. Compressed to aprox 0.5mb.
  championships: [{ type: mongoose.Schema.ObjectId, ref: "Championships" }], // Array of Championships the User has created.
  badges: [{ type: mongoose.Schema.ObjectId, ref: "Badge" }],
  refresh_count: { type: Number, default: 0 }, // Refresh count.
  logged_in_at: { type: String, default: null }, // Last logged in.
  created_at: { type: String, default: moment().format() }, // When the user signed up.
  updated_at: { type: String, default: moment().format() }, // Last user activity.
  permissions: {
    type: {
      admin: Boolean,
      adjudicator: Boolean,
      guest: Boolean,
    },
    required: false,
    default: {
      admin: false,
      adjudicator: false,
      guest: false,
    },
  },
})

const User = mongoose.model<userType>("User", userSchema)

export default User

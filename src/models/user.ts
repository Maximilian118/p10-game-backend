import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

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
  refresh_count: number
  logged_in_at: string
  created_at: string
  updated_at: string
  _doc: userType
}

const userSchema = new mongoose.Schema<userType>({
  name: { type: String, required: true }, // User Name.
  email: { type: String, required: true }, // User Email.
  password: { type: String, required: false, min: 8 }, // User encryptied password.
  icon: { type: String, required: false, default: "" }, // User Icon. Same image as Profile Picture but compressed to aprox 0.05mb.
  profile_picture: { type: String, required: false, default: "" }, // User Profile Picture. Compressed to aprox 0.5mb.
  championships: [{ type: String }], // Array of Championships the User has created.
  refresh_count: { type: Number, default: 0 }, // Refresh count.
  logged_in_at: { type: String, default: null }, // Last logged in.
  created_at: { type: String, default: moment().format() }, // When the user signed up.
  updated_at: { type: String, default: moment().format() }, // Last user activity.
})

const User = mongoose.model<userType>("User", userSchema)

export default User

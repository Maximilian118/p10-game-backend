import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

export interface badgeType {
  _id: ObjectId
  user_id: ObjectId
  url: string
  name: string
  rarity: number
  created_at: string
  tokens: string
  _doc: badgeType
}

const badgeSchema = new mongoose.Schema<badgeType>({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // _id of the user that this badge belongs to.
  url: { type: String, required: true, default: "" }, // URL to an image in AWS S3.
  name: { type: String, required: true, default: "" }, // Name of the badge.
  rarity: { type: Number, required: true, default: 0 }, // 0 = Common, 1 = Uncommon, 2 = Rare, 3 = Epic, 4 = Legendary, 5 = Mythic.
  created_at: { type: String, default: moment().format() }, // When the badge was awarded.
})

const Badge = mongoose.model<badgeType>("Badge", badgeSchema)

export default Badge

import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

export interface driverType {
  _id: ObjectId
  url: string
  name: string
  driverGroups: ObjectId[]
  stats: {
    heightCM: number
    weightKG: number
    age: number
    moustache: boolean
    mullet: boolean
  }
  created_at: string
  updated_at: string
  tokens: string[]
  _doc: driverType
}

const driverSchema = new mongoose.Schema<driverType>({
  url: { type: String, required: true }, // URL to an image in AWS S3.
  name: { type: String, required: true }, // Name of the driver.
  driverGroups: [{ type: mongoose.Schema.ObjectId, ref: "DriverGroup" }], // DriverGroups that this driver belongs to.
  stats: {
    // An object of stats for the driver.
    heightCM: { type: Number, required: true },
    weightKG: { type: Number, required: true },
    age: { type: Number, required: true },
    moustache: { type: Boolean, default: false },
    mullet: { type: Boolean, default: false },
  },
  created_at: { type: String, default: moment().format() }, // When the driver was created.
  updated_at: { type: String, default: moment().format() }, // When the driver was updated.
})

const Driver = mongoose.model<driverType>("Driver", driverSchema)

export default Driver

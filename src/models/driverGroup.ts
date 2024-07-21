import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

export interface driverGroupType {
  _id: ObjectId
  url: string
  name: string
  championships: ObjectId[]
  drivers: ObjectId[]
  created_at: string
  updated_at: string
  tokens: string[]
  _doc: driverGroupType
}

const driverGroupSchema = new mongoose.Schema<driverGroupType>({
  url: { type: String, required: true }, // URL to an image in AWS S3.
  name: { type: String, required: true }, // Name of the driver championship.
  championships: [{ type: mongoose.Schema.ObjectId, ref: "Champ" }], // Championships that this driver championship is being used for.
  drivers: [{ type: mongoose.Schema.ObjectId, ref: "Driver" }], // Drivers that belong in this driver championship.
  created_at: { type: String, default: moment().format() }, // When the driver championship was created.
  updated_at: { type: String, default: moment().format() }, // When the driver championship was updated.
})

const DriverGroup = mongoose.model<driverGroupType>("DriverGroup", driverGroupSchema)

export default DriverGroup

import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

export interface teamType {
  _id: ObjectId
  url: string
  name: string
  driverGroups: ObjectId[]
  drivers: ObjectId[]
  stats: {
    inceptionDate: string
    locationHQ: string
    nationality: string
  }
  created_at: string
  updated_at: string
  tokens: string[]
  _doc: teamType
}

const teamSchema = new mongoose.Schema<teamType>({
  url: { type: String, required: true }, // URL to an image in AWS S3.
  name: { type: String, required: true }, // Name of the team.
  driverGroups: [{ type: mongoose.Schema.ObjectId, ref: "DriverGroup" }], // Groups that this team competes in.
  drivers: [{ type: mongoose.Schema.ObjectId, ref: "Driver" }], // Drivers that belong in this team.
  stats: {
    inceptionDate: { type: String, required: true }, // Date the team was founded.
    locationHQ: { type: String, required: true }, // Where is the location of the teams factory?
    nationality: { type: String, required: true }, // What is teams nationality?
  },
  created_at: { type: String, default: moment().format() }, // When the team group was created.
  updated_at: { type: String, default: moment().format() }, // When the team group was updated.
})

const Team = mongoose.model<teamType>("Team", teamSchema)

export default Team

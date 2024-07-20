import mongoose from "mongoose"
import moment from "moment"
import { ObjectId } from "mongodb"

export interface ruleChangeType {
  _id: ObjectId
  championship: ObjectId
  createdBy: ObjectId
  title: string
  description: string
  vote: boolean
  voteArr: {
    user: ObjectId
    approve: boolean
  }[]
  voteExipiry: string
  created_at: string
  updated_at: string
  tokens: string[]
  _doc: ruleChangeType
}

const ruleChangeSchema = new mongoose.Schema<ruleChangeType>({
  championship: { type: mongoose.Schema.ObjectId, required: true, ref: "Champ" }, // The championship this protest was created for.
  createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }, // The user that created the protest.
  title: { type: String, required: true }, // Title of the protest.
  description: { type: String, required: true }, // Description of the protest.
  vote: { type: Boolean, default: true }, // Allow the current competitors of the championship to vote on the protest.
  voteArr: [
    {
      // All of the users in the champ.
      user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
      approve: { type: Boolean, default: false }, // true = yes, false = no.
    },
  ],
  voteExipiry: { type: String, default: moment().add(1, "M").format() }, // Set vote exipiry date.
  created_at: { type: String, default: moment().format() }, // When the protest was created.
  updated_at: { type: String, default: moment().format() }, // When the protest was updated.
})

const RuleChange = mongoose.model<ruleChangeType>("RuleChange", ruleChangeSchema)

export default RuleChange

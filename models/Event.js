import mongoose from "mongoose";
import { EVENT_TYPE } from '../utils/constants.js'

const EventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        // enum: ['rad', 'rad_od_kuce', 'bolovanje', 'sluzbeni_put', 'godisnji'],
        enum: Object.values(EVENT_TYPE),
        default: EVENT_TYPE.RAD,
    },
    eventDate: {
        type: Date,

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},
    // It enables the automatic generation and management of createdAt and updatedAt fields in the documents created using this schema
    { timestamps: true }
)

export default mongoose.model('Event', EventSchema)

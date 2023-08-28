import mongoose from "mongoose";
import { VACATION_REQUEST_STATUS } from '../utils/constants.js';

const VacationRequestSchema = new mongoose.Schema({
    fromDate: {
        type: Date,

    },
    toDate: {
        type: Date,

    },
    vacationRequestStatus: {
        type: String,
        // enum: ['pending', 'declined', 'approved'],
        enum: Object.values(VACATION_REQUEST_STATUS),
        default: VACATION_REQUEST_STATUS.PENDING,
    },
    vacationRequestDescription: {
        type: String,
        default: "",
    },
    vacationRequestDescription: {
        type: String,
        default: "",
    },
    rejectionExplanation: {
        type: String,
        default: "",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},
    // It enables the automatic generation and management of createdAt and updatedAt fields in the documents created using this schema
    { timestamps: true }
)

export default mongoose.model('VacationRequest', VacationRequestSchema)

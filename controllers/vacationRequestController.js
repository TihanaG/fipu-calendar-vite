import VacationRequest from "../models/VacationRequest.js";
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export const createVacationRequest = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const vacationRequest = await VacationRequest.create(req.body);
    res.status(StatusCodes.CREATED).json({ vacationRequest });
};

export const allVacationRequests = async (req, res) => {
    const vacationRequest = await VacationRequest.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ vacationRequest })
}

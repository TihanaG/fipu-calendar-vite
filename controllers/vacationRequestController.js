import VacationRequest from "../models/VacationRequest.js";
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export const createVacationRequest = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const vacationRequest = await VacationRequest.create(req.body);
    res.status(StatusCodes.CREATED).json({ vacationRequest });
};

export const allVacationRequests = async (req, res) => {
    const vacationRequests = await VacationRequest.find({ createdBy: req.user.userId }).sort({ createdAt: -1 }).populate('createdBy', 'name lastName');
    const totalVacationRequests = vacationRequests.length;
    res.status(StatusCodes.OK).json({ vacationRequests, totalVacationRequests })
}

export const getVacationRequest = async (req, res) => {
    const vacationRequest = await VacationRequest.findById(req.params.id).populate('createdBy', 'name lastName');
    res.status(StatusCodes.OK).json({ vacationRequest })
  }
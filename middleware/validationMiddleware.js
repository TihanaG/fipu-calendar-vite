import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { EVENT_TYPE, VACATION_REQUEST_STATUS } from '../utils/constants.js';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import User from '../models/User.js';
import VacationRequest from '../models/VacationRequest.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        // const firstMessage = errorMessages[0];
        // console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('no event')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateVacationRequestInput = withValidationErrors([
  body('vacationRequestStatus')
    .isIn(Object.values(VACATION_REQUEST_STATUS))
    .withMessage('invalid type value'),
  body('fromDate').notEmpty().withMessage('Date is required'),
  body('toDate').notEmpty().withMessage('Date is required'),
]);

export const validateEventInput = withValidationErrors([
  body('eventType')
    .isIn(Object.values(EVENT_TYPE))
    .withMessage('invalid type value'),
  body('eventDate').notEmpty().withMessage('Event date is required'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const event = await Event.findById(value);
    if (!event) throw new NotFoundError(`no event with id ${value}`);
    console.log(req);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === event.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateVacationIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const vacationRequest = await VacationRequest.findById(value);
    if (!vacationRequest) throw new NotFoundError(`no vacation request with id ${value}`);
    console.log(req);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === vacationRequest.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('Email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('location').notEmpty().withMessage('Location is required'),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
])


export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('Email already exists')
      }
    }),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('location').notEmpty().withMessage('Location is required'),
])
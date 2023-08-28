import { Router } from 'express'
const router = Router()

import {
    getAllEvents,
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    showReports,
    createEvents,
} from '../controllers/eventController.js'
import { validateEventInput, validateIdParam } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

router.route('/').get(getAllEvents).post(checkForTestUser, validateEventInput, createEvent)

router.route('/all').post(checkForTestUser, createEvents)

router.route('/reports').get(showReports)

router
    .route('/:id')
    .get(validateIdParam, getEvent)
    .patch(checkForTestUser, validateEventInput, validateIdParam, updateEvent)
    .delete(checkForTestUser, validateIdParam, deleteEvent)

export default router
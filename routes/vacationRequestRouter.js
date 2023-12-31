import { Router } from 'express'
const router = Router()

import {
    createVacationRequest,
    allVacationRequests,
    getVacationRequest
} from '../controllers/vacationRequestController.js'
import { validateVacationRequestInput } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

router.route('/').get(allVacationRequests).post(checkForTestUser, validateVacationRequestInput, createVacationRequest)
router.route('/:id').get(getVacationRequest)
// router.route('/all-requests').get(allVacationRequests)

export default router
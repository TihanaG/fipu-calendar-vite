import { Router } from "express";
const router = Router();
import { getApplicationReports, getCurrentUser, getAllVacationRequests, updateUser, getVacationRequest, updateVacationRequest, createVacationEventsForSelectedDates } from "../controllers/userController.js";
import { validateUpdateUserInput, validateVacationIdParam, validateVacationRequestInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware.js";

router.get('/current-user', getCurrentUser)
router.get('/admin/app-reports', [
    authorizePermissions('admin'),
    getApplicationReports,
])
router.get('/admin/all-vacation-requests', [
    authorizePermissions('admin'),
    getAllVacationRequests,
])
router.patch('/update-user', checkForTestUser, validateUpdateUserInput, updateUser)

//router
//    .route('admin/edit-vacation-request/:id')
//    .get(validateVacationIdParam, getVacationRequest)
//    .patch(checkForTestUser, validateVacationRequestInput, validateVacationIdParam, updateVacationRequest)

router.get('/admin/edit-vacation-request/:id', [
    authorizePermissions('admin'),
    getVacationRequest,
])

/*
router.patch('/admin/edit-vacation-request/:id', [
    authorizePermissions('admin'),
    // validateVacationRequestInput,
    validateVacationIdParam,
    updateVacationRequest,
])
*/

router.post('/admin/edit-vacation-request/:id', [
    authorizePermissions('admin'),
    validateVacationIdParam,
    createVacationEventsForSelectedDates,
])

router.post('/admin/create-events-for-selected-dates', [
    authorizePermissions('admin'),
    createVacationEventsForSelectedDates,
])

export default router
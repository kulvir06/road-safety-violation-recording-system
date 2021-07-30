import express from 'express';
import userController from '../controllers/userControllers/index';
import bodyParser from 'body-parser';
import validateToken from '../middleware/validateToken';
import complaintController from '../controllers/complaintControllers/index';
import dataController from '../controllers/dataControllers/index';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/create_new_user', userController.create_new_user);

router.post('/login_user', userController.login_user);

router.post('/user_dashboard', validateToken, userController.dashboard);

router.post('/upload_complaint', validateToken, complaintController.create_new_complaint);

router.post('/get_location_data', validateToken, dataController.location );
router.post('/get_transporter_data', validateToken, dataController.transporter);
router.post('/get_complaint_data', validateToken, dataController.complaint)

router.post('/get_complaint_data_admin', validateToken, dataController.adminComplaint)

router.post('/update_complaint_data', validateToken, complaintController.update_complaint);

router.post('/report', validateToken, complaintController.report);

module.exports =  router;
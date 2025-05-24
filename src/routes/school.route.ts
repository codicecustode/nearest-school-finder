import { Router } from 'express';


const router = Router();

import SchoolRepository from '../repository/school.repository'
import SchoolController from '../controllers/school.controller'
import SchoolService from '../services/school.service'

const schoolRepository = new SchoolRepository()
const schoolservice = new SchoolService(schoolRepository)
const schoolController = new SchoolController(schoolservice)



router.route('/addSchool').post(schoolController.addSchool.bind(schoolController))
router.route('/listSchools').get(schoolController.findNearBySchool.bind(schoolController))


export default router;
import { Router } from 'express';
import { registerDoctor } from '../../controller/doctor.controller';
import { authenticate } from '../../authentication/jwtAuth';
import { getAllDoctors } from '../../controller/doctor.controller';
import { getDoctorById } from '../../controller/doctor.controller';
import { updateDoctor } from '../../controller/doctor.controller';
import { deleteDoctor } from '../../controller/doctor.controller';
const router = Router();

// Register Doctor
router.post('/register',authenticate, registerDoctor);
router.get('/doctors', getAllDoctors);

// Get a specific doctor by ID
router.get('/doctors/:id', getDoctorById);

// Update a doctor's information
router.put('/doctors/:id', updateDoctor);

// Delete a doctor
router.delete('/doctors/:id', deleteDoctor);
// Sign In Doctor


export default router;

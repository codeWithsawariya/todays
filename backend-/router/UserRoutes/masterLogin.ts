import { Router } from 'express';
import { signIn } from '../../controller/auth.controller';


const router = Router();

// Middleware to parse JSON request body (not needed here since it's in the main app)

// POST /signin
router.post('/', signIn); // Adjusted the endpoint to match the main app route

export default router;

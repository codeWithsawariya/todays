import express from 'express';
import connectDB from './DB/db.config'; 
import UserRouter from './router/UserRoutes/admin.router';
import DoctorRouter from './router/UserRoutes/doctor.route';
import PatientRouter from './router/UserRoutes/patient.route';
import StaffRouter from './router/UserRoutes/medicalStaff.route';
import AppointmentRouter from './router/UserRoutes/Appointment.router';
import MasterRouter from './router/UserRoutes/masterLogin'; // Assuming this is your auth router
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/admin', UserRouter);
app.use('/doctor', DoctorRouter);
app.use('/patient', PatientRouter);
app.use('/medicalStaff', StaffRouter);
app.use('/appointment', AppointmentRouter);
app.use('/signin', MasterRouter); // Ensure this points to your sign-in route

// Start Server and Connect to Database
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (err) {
    console.error(`Database connection failed: ${err}`);
  }
});

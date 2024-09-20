// controllers/doctor.controller.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/UserModels/doctor.model';
import Master from '../models/UserModels/Master.model'; // Import Master model
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.JWT_SECRET || 'your_jwt_secret';
const tokenExpiry = '1h';

// Register Doctor
export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      lastName,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      pincode,
      contactInformation,
      email,
      specialization,
      department,
      professionalInformation,
      workSchedule,
      username,
      password,
      documentation,
      emergencyContact,
      profileStatus,
      additionalInformation,
    } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const doctor = new Doctor({
      fullName,
      lastName,
      dateOfBirth,
      gender,
      country,
      city,
      address,
      pincode,
      contactInformation,
      email,
      specialization,
      department,
      professionalInformation,
      workSchedule,
      authentication: {
        username,
        password: hashedPassword,
        role: 'Doctor',
      },
      documentation,
      emergencyContact,
      profileStatus,
      additionalInformation,
    });

    await doctor.save();

    // Store the doctor info in the Master collection
    const masterUser = new Master({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'doctor',
    });

    await masterUser.save();

    const token = jwt.sign({ id: doctor._id, role: doctor.authentication.role }, secret, {
      expiresIn: tokenExpiry,
    });

    res.status(201).json({ message: 'Doctor registered successfully', token });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get All Doctors (Read)
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update Doctor (Update)
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const doctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete Doctor (Delete)
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Optionally, remove from Master collection as well
    await Master.deleteOne({ email: doctor.email }); // Assuming you want to remove the Master record

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
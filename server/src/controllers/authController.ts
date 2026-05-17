import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '../models/User';
import { UserRole } from '../types';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/token';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.map((error) => String(error.msg));
};

export const register = async (
  req: Request<Record<string, never>, unknown, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: formatValidationErrors(errors.array()),
    });
    return;
  }

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken({ id: user._id.toString(), role: user.role });

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
};

export const login = async (
  req: Request<Record<string, never>, unknown, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: formatValidationErrors(errors.array()),
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user._id.toString(), role: user.role });

    res.json({
      success: true,
      data: { user, token },
    });
  } catch {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { createUser, findUserByEmail, sanitizeUser } from '../models/User';
import { UserRole } from '../types';
import { getErrorMessage, sendValidationError } from '../utils/errorResponse';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/token';
import { v4 as uuidv4 } from 'uuid';

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
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();
    const user = await createUser({
      userId,
      name,
      email,
      password: hashedPassword,
      role: role || 'sales',
    });

    const token = generateToken({ id: user.userId, role: user.role });
    const safeUser = sanitizeUser(user);

    res.status(201).json({
      success: true,
      data: { user: safeUser, token },
    });
  } catch (error: unknown) {
    if (sendValidationError(error, res, 'User validation failed')) {
      return;
    }

    console.error(`Registration failed: ${getErrorMessage(error)}`);
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
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user.userId, role: user.role });
    const safeUser = sanitizeUser(user);

    res.json({
      success: true,
      data: { user: safeUser, token },
    });
  } catch (error: unknown) {
    console.error(`Login failed: ${getErrorMessage(error)}`);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

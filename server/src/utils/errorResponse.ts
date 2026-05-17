import mongoose from 'mongoose';
import { Response } from 'express';

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

export const sendValidationError = (
  error: unknown,
  res: Response,
  fallbackMessage: string
): boolean => {
  if (!(error instanceof mongoose.Error.ValidationError)) {
    return false;
  }

  const errors = Object.values(error.errors).map((item) => item.message);

  res.status(400).json({
    success: false,
    message: fallbackMessage,
    errors,
  });

  return true;
};

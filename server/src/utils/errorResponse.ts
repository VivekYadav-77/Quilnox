import { Response } from 'express';

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

export const sendValidationError = (
  error: unknown,
  res: Response,
  fallbackMessage: string
): boolean => {
  // Mongoose is removed, so we don't have mongoose.Error.ValidationError anymore.
  // Express-validator errors are caught in the controller.
  // If we wanted to catch specific DynamoDB ValidationException errors, we could check here.
  // For now, we'll just check if it's an Error and has 'name' === 'ValidationException' (DynamoDB style)
  
  if (error instanceof Error && error.name === 'ValidationException') {
    res.status(400).json({
      success: false,
      message: fallbackMessage,
      errors: [error.message],
    });
    return true;
  }

  return false;
};

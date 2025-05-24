import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = err.message || 'Internal Server Error'
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message
  })
}
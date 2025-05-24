import { Request, Response, NextFunction } from 'express'
import { schoolSchema, findNearBySchoolSchema } from '../validator/school.validator'
import z from 'zod'
export default class SchoolController {
  private schoolService: any;
  constructor(schoolService: any) {
    this.schoolService = schoolService
  }

  async addSchool(req: Request, res: Response, next: NextFunction) {

    try {
      schoolSchema.parse(req)
      const { ...schooldata } = req.body;
      const id = await this.schoolService.addSchool(schooldata)
      res.status(201).json({
        messege: "School Location added successfully.",
        data: {
          id
        }
      })
      return
    } catch (error) {
      if (error instanceof z.ZodError) {
        next({
          statusCode: 400,
          message: error.errors.map(err => err.message).join(', ')
        })
      } else {
        next(error)
      }
    }
  }

  async findNearBySchool(req: Request, res: Response, next: NextFunction) {

    try {
      await findNearBySchoolSchema.parse(req)
      const { latitude, longitude } = req.query
      const nearBySchools = await this.schoolService.findNearBySchool(Number(latitude), Number(longitude))
      res.status(200).json({
        message: "Nearby Schools Retrive Successfuuly",
        data: nearBySchools
      })
      return
    } catch (error: any) {
      next(error)
    }

  }
}
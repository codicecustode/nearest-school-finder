import ErrorHandler from '../utils/errorHandler'
export interface ISchoolData {
  name: string,
  address: string,
  latitude: number,
  longitude: number
}
export default class SchoolService {
  private schoolRepository;
  constructor(schoolRepository: any) {
    this.schoolRepository = schoolRepository
  }
  async addSchool(data: ISchoolData) {
    try {
      const { name, address, latitude, longitude } = data;
      if (!name || !address || latitude == null || longitude == null) {
        throw new ErrorHandler(400, 'Bad Request - All fields are required: name, address, latitude, and longitude.');
      }
      const id = this.schoolRepository.addSchool(data);
      return id;
    } catch (err: any) {
      if (err.message === 'A database error occurred while adding school data. Please try again later.') {
        new ErrorHandler(500, err.message)
      } else {
        throw err
      }
    }
  }

  async findNearBySchool(latitude: number, longitude: number) {
    try {
      const nearbySchools = await this.schoolRepository.findSchools(latitude, longitude);
      return nearbySchools;

    } catch (err: any) {
      if (err.message === 'Error while fetching the the schools data from the db.') {
        new ErrorHandler(500, err.message)
      } else {
        throw err
      }
    }

  }
}
import mysql2 from 'mysql2/promise'
import { ISchoolData } from '../services/school.service'
import connection from '../config/db.config'
export default class SchoolRepository {
  async addSchool(data: ISchoolData) {
    try {

      const [result] = await connection.execute<mysql2.ResultSetHeader>(
        `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
        [data.name, data.address, data.latitude, data.longitude]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error while adding school data:", err)
      throw new Error("A database error occurred while adding school data. Please try again later.")
    }
  }

  async findSchools(userLat: number, userLng: number, limit: number = 5) {
    try {
      if (userLat == null || userLng == null || isNaN(userLat) || isNaN(userLng)) {
        throw new Error("Latitude and Longitude must be valid numbers.");
      }

      // Ensure limit is a safe number to avoid SQL injection
      const safeLimit = Math.max(1, Math.min(limit || 5, 50)); // Allow only 1-50

      const query = `
      SELECT
        id,
        name,
        latitude,
        longitude,
        ST_Distance_Sphere(
          POINT(longitude, latitude),
          POINT(?, ?)
        ) AS distance_in_meters
      FROM schools
      ORDER BY distance_in_meters
      LIMIT ${safeLimit}  -- interpolated directly
    `;

      const [rows] = await connection.execute(query, [userLng, userLat]);

      return rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching the schools data from the DB.");
    }
  }

}







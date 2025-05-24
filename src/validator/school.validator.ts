import z from 'zod'

export const schoolSchema = z.object({
  body: z.object({
    name: z.string().min(3, "name must atleast 3 letter"),
    address: z.string().min(3, "Address must be 3 leeter"),
    latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180")
  })
})

export type schoolType = z.infer<typeof schoolSchema>["body"]

export const findNearBySchoolSchema = z.object({
  query: z.object({

    latitude: z.string().refine(val => {
      const num = Number(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    }, {
      message: "Latitude must be a number between -90 and 90"
    }),
    longitude: z.string().refine(val => {
      const num = Number(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    }, {
      message: "Longitude must be a number between -180 and 180"
    })
  })
})

export type findNearBySchoolType = z.infer<typeof findNearBySchoolSchema>["query"]
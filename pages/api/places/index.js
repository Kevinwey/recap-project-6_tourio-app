import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      /* const place = new Place(request.body);
      await place.save() */

      Place.create(request.body);
      response.status(200).json({ Status: "Success" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ Status: "Failed" });
    }
  }
}

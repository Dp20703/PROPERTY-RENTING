const { ObjectId } = require("mongodb");
const connectDB = require("../DB/connectDB");

async function send_request(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("Request");
    const { property_Id, owner_Id, startDate, endDate } = req.body;
    if (!property_Id || !owner_Id || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user_Id = user.session._id;
    await collection.insertOne({
      user_Id: ObjectId.createFromHexString(user_Id),
      property_Id: ObjectId.createFromHexString(property_Id),
      owner_Id: ObjectId.createFromHexString(owner_Id),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "Pending",
      bookingDate: new Date(),
    });
    return res.status(200).json({ message: "Request sent Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

module.exports = { send_request };

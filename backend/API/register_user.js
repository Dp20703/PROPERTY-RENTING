const connectDB = require("../DB/connectDB");

async function register_user(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("Register");

    const { firstName, lastName, email, phoneNo, password } = req.body;
    if (!firstName || !lastName || !email || !phoneNo || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await collection.insertOne({
      firstName,
      lastName,
      email,
      phoneNo,
      password,
      role: "user",
    });
    return res.status(200).json({ message: "User Register Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

module.exports = { register_user };

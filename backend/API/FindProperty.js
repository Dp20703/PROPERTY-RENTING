const connectDB = require("../DB/connectDB");

async function search_property(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("Property");

    // Extract search parameters from request body
    const { keywords, maxSqft, propertyType, maxBudget } = req.body;

    // Construct the search query
    const query = {
      title: { $regex: keywords, $options: "i" }, // Case-insensitive search for keywords in title
      size: { $lte: parseFloat(maxSqft) }, // Property size should be ≤ maxSqft
      propertyType: propertyType, // Exact match for property type
      price: { $lte: parseFloat(maxBudget) }, // Property price should be ≤ maxBudget
    };

    // Fetch matching properties
    const properties = await collection.find(query).toArray();

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json({
      message: "Properties found successfully",
      data: properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { search_property };

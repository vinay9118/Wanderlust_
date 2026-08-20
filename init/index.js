// require("dotenv").config({ path: "../.env" });
// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");


// const mongoose_URL = process.env.ATLASDB_URL;

// main().then(() => {
//     console.log("Connected to db");
// }).catch((err) => {
//     console.log(err);
// });
// async function main() {
//     await mongoose.connect(mongoose_URL);
// };

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj) => ({
//      ...obj,
//       owner: "698b63cab56b0246ab0cd34d",
//      }));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// }
// initDB();


const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoose_URL = process.env.ATLASDB_URL;

console.log("MongoDB URL loaded:", !!mongoose_URL);

if (!mongoose_URL) {
    console.error("❌ ATLASDB_URL is missing from .env");
    process.exit(1);
}

async function main() {
    try {
        await mongoose.connect(mongoose_URL);

        console.log("✅ Connected to MongoDB Atlas");

        await Listing.deleteMany({});
        console.log("✅ Old listings deleted");

        const listings = initData.data.map((obj) => ({
            ...obj,
            owner: "698b63cab56b0246ab0cd34d"
        }));

        await Listing.insertMany(listings);

        console.log("✅ Data was initialized successfully");

        await mongoose.connection.close();

        console.log("✅ MongoDB connection closed");

    } catch (err) {
        console.error("❌ MongoDB Error:", err);
        process.exit(1);
    }
}

main();
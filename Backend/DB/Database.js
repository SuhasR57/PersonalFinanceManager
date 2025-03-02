import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    //mongo server url
    const url = "mongodb+srv://fooddel:nhce2024@cluster0.jgsiyhk.mongodb.net/testdb?retryWrites=true&w=majority";

    const { connection } = await mongoose.connect(url);

    console.log(`MongoDB Connection successful to ${connection.host}`);

}
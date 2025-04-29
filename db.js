import mongoose from "mongoose";

const DB = mongoose.connect("mongodb+srv://vikas:vikas@cluster0.qz4qlk2.mongodb.net/estate?retryWrites=true&w=majority&appName=Cluster0");
DB.then((result) => {
  console.log("DataBase Connected");
});
DB.catch((err) => {
  console.log("DataBase Not Connected");
});

export default DB;

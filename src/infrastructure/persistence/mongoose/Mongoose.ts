import mongoose from "mongoose";
import { MongooseInterface } from "./Mongoose.interface";

export class Mongoose implements MongooseInterface {

  constructor() {
    this.openConnection();
  }

  public openConnection() {
    mongoose.connect(process.env.MONGOOSE_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then(() => {
      console.log("MongoDB connected :)")
    }).catch(error => console.log(error));
  }

  closeConnection(): void {
    //mongoose.connection.close();
  }
}

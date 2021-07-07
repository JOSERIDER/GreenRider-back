import { model, Schema } from "mongoose";

const schemaDefinition = {
  name: String,
  duration: String,
  difficult: String,
  unit: String,
  description: String,
  distance: Number,
  comments: Array
}

const routeSchema = new Schema(schemaDefinition);

routeSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id;
    returnedObject.comments.map((comment: any) => {
      comment.id = comment._id;
      delete comment._id;

      return comment;
    })
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const routeModel = model("Route", routeSchema);

export default routeModel;
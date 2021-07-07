import { model, Model, Schema } from "mongoose";
import { Comment } from "../../model/domain";

export const commentSchema = new Schema<Comment, Model<Comment>, Comment>({
  name: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: Date
});

commentSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const commentModel = model("Comment", commentSchema);

export default commentModel;

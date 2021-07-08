import { model, Model, Schema } from 'mongoose';
import { User } from '../../model/domain';

const userSchema = new Schema<User, Model<User>, User>({
  email: {type: String, required: true},
  passwordHash: {type: String, required: true},
  name: {type: String, required: true}
});

userSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const userModel = model("User", userSchema);

export default userModel;

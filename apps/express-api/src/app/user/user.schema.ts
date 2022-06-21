import {model, Schema, Model, Document} from 'mongoose';

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  id: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
});

export const User: Model<IUser> = model('User', UserSchema);

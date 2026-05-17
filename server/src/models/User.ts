import mongoose, { Document, Schema, Types } from 'mongoose';
import { UserRole } from '../types';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

type UserJson = Omit<IUser, 'password'> & {
  password?: string;
};

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'sales'] satisfies UserRole[],
      default: 'sales',
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function toJSON(): Omit<IUser, 'password'> {
  const userObject = this.toObject() as UserJson;
  delete userObject.password;
  return userObject;
};

export const User = mongoose.model<IUser>('User', userSchema);

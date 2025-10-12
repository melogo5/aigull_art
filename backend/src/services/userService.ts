import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { config } from '../config/config';

export class UserService {
  static async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }

  static async authenticateUser(email: string, password: string): Promise<string> {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
    };

    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
  }


  static async getAllUsers(): Promise<IUser[]> {
    return await User.find().select('-password');
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select('-password');
  }

  static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');
  }

  static async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

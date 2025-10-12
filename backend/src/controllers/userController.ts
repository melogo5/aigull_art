import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthRequest } from '../middlewares/auth';

export const userController = {
  // @desc    Register user
  // @route   POST /api/users/register
  // @access  Public
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide all required fields',
        });
        return;
      }

      const user = await UserService.createUser({ name, email, password });
      const token = await UserService.authenticateUser(email, password);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  },

  // @desc    Login user
  // @route   POST /api/users/login
  // @access  Public
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide email and password',
        });
        return;
      }

      const token = await UserService.authenticateUser(email, password);
      
      // Decode token to get user ID
      const jwt = require('jsonwebtoken');
      const decoded = jwt.decode(token) as { userId: string };
      const user = await UserService.getUserById(decoded.userId);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
          },
          token,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  },

  // @desc    Get current user
  // @route   GET /api/users/me
  // @access  Private
  getMe: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user = req.user;

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
            avatar: user?.avatar,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

  // @desc    Get all users
  // @route   GET /api/users
  // @access  Private/Admin
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Private
  updateUser: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await UserService.updateUser(id, updateData);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

  // @desc    Delete user
  // @route   DELETE /api/users/:id
  // @access  Private/Admin
  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUser(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
};

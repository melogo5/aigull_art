import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthRequest } from '../middlewares/auth';
import { config } from '../config/config';

export const userController = {
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

      const jwt = require('jsonwebtoken');
      const decoded = jwt.decode(token) as { userId: string };
      const user = await UserService.getUserById(decoded.userId);

      const cookieOptions: any = {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: config.cookieMaxAge,
        path: '/',
      };

      if (config.nodeEnv === 'production' && req.secure) {
        cookieOptions.secure = true;
      }

      res.cookie('token', token, cookieOptions);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
          },
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  },

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

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      const clearCookieOptions: any = {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      };

      if (config.nodeEnv === 'production' && req.secure) {
        clearCookieOptions.secure = true;
      }

      res.clearCookie('token', clearCookieOptions);

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

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

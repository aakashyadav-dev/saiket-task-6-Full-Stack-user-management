const UserModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * User Controller - Handles HTTP requests and responses
 */
class UserController {
    /**
     * Get all users
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.findAll();
            
            return successResponse(
                res,
                200,
                'Users retrieved successfully',
                users
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get a user by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);

            if (!user) {
                return errorResponse(
                    res,
                    404,
                    `User with ID ${id} not found`
                );
            }

            return successResponse(
                res,
                200,
                'User retrieved successfully',
                user
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create a new user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async createUser(req, res, next) {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResponse(
                    res,
                    400,
                    'Validation failed',
                    errors.array().map(err => ({
                        field: err.path,
                        message: err.msg
                    }))
                );
            }

            const { name, email, age } = req.body;

            // Check for duplicate email
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return errorResponse(
                    res,
                    400,
                    'Email already exists',
                    [{ field: 'email', message: 'Email is already registered' }]
                );
            }

            const newUser = await UserModel.create({ name, email, age });

            return successResponse(
                res,
                201,
                'User created successfully',
                newUser
            );
        } catch (error) {
            // Handle duplicate email error from database
            if (error.code === 'ER_DUP_ENTRY') {
                return errorResponse(
                    res,
                    400,
                    'Email already exists',
                    [{ field: 'email', message: 'Email is already registered' }]
                );
            }
            next(error);
        }
    }

    /**
     * Update an existing user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResponse(
                    res,
                    400,
                    'Validation failed',
                    errors.array().map(err => ({
                        field: err.path,
                        message: err.msg
                    }))
                );
            }

            // Check if user exists
            const existingUser = await UserModel.findById(id);
            if (!existingUser) {
                return errorResponse(
                    res,
                    404,
                    `User with ID ${id} not found`
                );
            }

            const { name, email, age } = req.body;

            // Check for duplicate email if email is being updated
            if (email && email.toLowerCase() !== existingUser.email) {
                const emailExists = await UserModel.emailExists(email, id);
                if (emailExists) {
                    return errorResponse(
                        res,
                        400,
                        'Email already exists',
                        [{ field: 'email', message: 'Email is already registered' }]
                    );
                }
            }

            const updateData = {};
            if (name !== undefined) updateData.name = name;
            if (email !== undefined) updateData.email = email;
            if (age !== undefined) updateData.age = age;

            const updatedUser = await UserModel.update(id, updateData);

            return successResponse(
                res,
                200,
                'User updated successfully',
                updatedUser
            );
        } catch (error) {
            // Handle duplicate email error from database
            if (error.code === 'ER_DUP_ENTRY') {
                return errorResponse(
                    res,
                    400,
                    'Email already exists',
                    [{ field: 'email', message: 'Email is already registered' }]
                );
            }
            next(error);
        }
    }

    /**
     * Delete a user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            // Check if user exists
            const user = await UserModel.findById(id);
            if (!user) {
                return errorResponse(
                    res,
                    404,
                    `User with ID ${id} not found`
                );
            }

            const deleted = await UserModel.delete(id);

            return successResponse(
                res,
                200,
                'User deleted successfully',
                { id, deleted: true }
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
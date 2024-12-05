import Token from "../models/token-model";
import InternalServerError from "../utils/errors/internal-server-error";
import BadRequestError from "../utils/errors/bad-request-error";
import AppError from "../utils/errors/app-error";
import {Types} from "mongoose";
import conflictError from "../utils/errors/conflict-error";

class TokenRepository {
    async create(token: string, userId: string|Types.ObjectId) {
        try {
            // Create a new token
            return await Token.create({ token: token, userId: userId });
        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            if(error instanceof Error) {
                if (error.name === 'ValidationError') {
                    // If the error is a validation error, throw a bad request error
                    throw new BadRequestError(error.message);
                } else if(error.name === 'MongoServerError') {
                    // If the error is a duplicate key error, throw a conflict error
                    throw new conflictError('token');
                }
            }
            // If the error is not a validation error or a duplicate key error, throw an internal server error
            throw new InternalServerError();

        }
    }

    async findByUserId(userId: string|Types.ObjectId) {
        try {
            // Find a token by userId and return it
            return await Token.findOne({
                userId: userId
            });
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();

        }
    }

    async deleteByUserId(userId: string|Types.ObjectId) {
        try {
            // Delete a token by userId
            return await Token.findOneAndDelete({
                userId: userId
            });
        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            if (error instanceof AppError) {
                // If the error is an app error, rethrow it
                throw error;
            } else {
                // Otherwise, throw an internal server error
                throw new InternalServerError();
            }
        }
    }
}

export default TokenRepository;

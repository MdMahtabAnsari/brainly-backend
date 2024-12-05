import User from "../models/user-model";
import BadRequestError from "../utils/errors/bad-request-error";
import InternalServerError from "../utils/errors/internal-server-error";
import NotFoundError from "../utils/errors/not-found-error";
import ConflictError from "../utils/errors/conflict-error";
import AppError from "../utils/errors/app-error";
import {userInputType} from "../utils/zod-schema/user-zod-schema";

class UserRepository {
    async create({username, password}: userInputType) {
        try {
            // Create a new user
            const user = await User.create({ username: username, password: password });
            // Return the user without the password
            if(!user) {
                throw new InternalServerError();
            }
            return this.findByUsernameWithoutPassword(username);


        } catch (error) {
            // Handle errors
            console.log(error);

            // Check the error type
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            else if(error instanceof Error){
                if(error.name === 'validationError'){
                   //  Check if the error is a validation error
                   throw new BadRequestError(error.message);
                }
                else if(error.name === 'MongoServerError'){
                    // Check if the error is a duplicate key error
                    throw new ConflictError('username');
                }
            }

            // If the error is not a validation error or a duplicate key error, throw an internal server error
            throw new InternalServerError();


        }
    }

    async findByUsername(username: string) {
        try {
            // Find a user by username
            const user = await User.findOne({ username: username });
            // Check if the user exists
            if (!user) {
                // If the user does not exist, throw a not found error
                throw new NotFoundError('user');
            }
            // Return the user
            return user.toObject();
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

    async updatePassword({ username, password }: userInputType) {
        try {
            // Update the user's password
            const user = await User.findOneAndUpdate(
                { username: username },
                { password: password },
                { new: true }
            ).select('-password');
            // Check if the user exists
            if (!user) {
                // If the user does not exist, throw a not found error
                throw new NotFoundError('user');
            }
            // Return the user
            return user.toObject();
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
    async findByUsernameWithoutPassword(username: string) {
        try {
            // Find a user by username
            const user = await User.findOne({username: username}).select('-password');
            // Check if the user exists
            if (!user) {
                // If the user does not exist, throw a not found error
                throw new NotFoundError('user');
            }
            // Return the user
            return user.toObject();
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

export default UserRepository;
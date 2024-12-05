import UserRepository from "../repositories/user-repository";
import AppError from "../utils/errors/app-error";
import InternalServerError from "../utils/errors/internal-server-error";
import UnauthorizedError from "../utils/errors/unauthorized-error";
import bcrypt from 'bcrypt';
import serverConfig from '../configs/server-config'
import TokenService from "./token-service";
import {userInputType} from "../utils/zod-schema/user-zod-schema";

class UserService{
    private userRepository: UserRepository;
    private tokenService: TokenService;

    constructor(){
        this.userRepository = new UserRepository();
        this.tokenService = new TokenService();
    }

    async updatePassword({username, password}: userInputType){
        try {
            const hashedPassword = await bcrypt.hash(password, serverConfig.SALT_ROUNDS);
            // Update the user's password
            return await this.userRepository.updatePassword({username, password: hashedPassword});

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
    async findByUsername(username: string){
        try {
            // Find a user by username
            // Return the user without the password
            return await this.userRepository.findByUsernameWithoutPassword(username);

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

    async signUp({username, password}: userInputType){
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password,serverConfig.SALT_ROUNDS);
            // Create a new user
            return await this.userRepository.create({username, password: hashedPassword});

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

    async signIn({username, password}: userInputType){
        try {
            // Find the user by username
            const user = await this.userRepository.findByUsername(username);
            // Compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            // Check if the password is correct
            if (!isMatch) {
                // If the password is incorrect, throw a bad request error
                throw new UnauthorizedError('Invalid credentials');
            }
            // Generate a JWT and return it
          const tokens= await this.tokenService.signToken(username);
            const userWithoutPassword = await this.userRepository.findByUsernameWithoutPassword(username);
            return {user:userWithoutPassword,accessToken:tokens.accessToken,refreshToken:tokens.refreshToken};
        }catch (error) {
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

export default UserService;
import Link from '../models/link-model';
import InternalServerError from '../utils/errors/internal-server-error';
import BadRequestError from '../utils/errors/bad-request-error';
import NotFoundError from '../utils/errors/not-found-error';
import ConflictError from '../utils/errors/conflict-error';
import AppError from '../utils/errors/app-error';
import {Types} from 'mongoose';

class LinkRepository {

    async create(hash:string,userId:string|Types.ObjectId){
        try {
            // Create a new link
            const link = await Link.create({hash:hash,userId:userId});
            return link.toObject();
        }
        catch(error){
            // Handle errors
            console.log(error);
            // Check the error type
            if(error instanceof Error){
                if(error.name === 'ValidationError'){
                    // If the error is a validation error, throw a bad request error
                    throw new BadRequestError(error.message);
                }
                else if(error.name === 'MongoServerError'){
                    // If the error is a duplicate key error, throw a conflict error
                    throw new ConflictError('Link');
                }
            }
            // If the error is not a validation error or a duplicate key error, throw an internal server error
            throw new InternalServerError();
        }
    }

    async findHashByUserId(userId:string|Types.ObjectId){
        try {
            // Find a link by userId and return it
            const link = await Link.findOne({
                userId:userId
            });
           if(link){
               return link.toObject();
           }
              return null;
        }
        catch(error){
            // Handle errors
            console.log(error);
              // Otherwise, throw an internal server error
            throw new InternalServerError();
        }
    }

    async deleteByUserId(userId:string|Types.ObjectId){
        try {
            // Delete a link by userId
            return await Link.findOneAndDelete({
                userId: userId
            });
        }
        catch(error){
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }
    async findByHash(hash:string){
        try {
            // Find a link by hash
            const link = await Link.findOne({ hash: hash });
            // Check if the link exists
            if(link){
                return link.toObject();
            }
            return null

        } catch (error) {
            // Handle errors
            console.log(error);

            // Otherwise, throw an internal server error
            throw new InternalServerError();
        }
    }
}

export default LinkRepository;
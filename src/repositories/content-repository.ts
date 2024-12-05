import Content from "../models/content-model";
import TagRepository from "./tag-repository"
import InternalServerError from "../utils/errors/internal-server-error";
import BadRequestError from "../utils/errors/bad-request-error";
import NotFoundError from "../utils/errors/not-found-error";
import ConflictError from "../utils/errors/conflict-error";
import AppError from "../utils/errors/app-error";
import {Types} from "mongoose";
import {ContentInputType} from "../utils/zod-schema/content-zod-schema";

class ContentRepository {
    private tagRepository: TagRepository;
    constructor() {
        this.tagRepository = new TagRepository();
    }
    async create({ type, link, title, tags }: ContentInputType,userId:Types.ObjectId|string) {
        try {
            // Create a new content
            const tagIds = await this.tagRepository.createTags(tags);
           const content =  await Content.create({ type: type, link: link, title: title, tags: tagIds, userId: userId });
           return content.toObject();
        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            else if(error instanceof Error){
                if(error.name === 'ValidationError'){
                    // If the error is a validation error, throw a bad request error
                    throw new BadRequestError(error.message);
                }
                else if(error.name === 'MongoServerError'){
                    // If the error is a duplicate key error, throw a conflict error
                    throw new ConflictError('Content');
                }
            }

            // If the error is not a validation error or a duplicate key error, throw an internal server error
            throw new InternalServerError();
        }
    }

    async findById(id: string|Types.ObjectId) {
        try {
            // Find a content by id
           const content = await Content.findById(id);
              if(!content){
                throw new NotFoundError('Content');
              }
              return content.toObject();

        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            throw new InternalServerError();
        }
    }

    async findByIdWithPopulate(id: string|Types.ObjectId) {
        try {
            // Find a content by id
            return await Content.findById(id).populate({ path: 'userId', select: '-password' }).populate('tags');
        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            throw new InternalServerError();
        }
    }


    async updateById({ type, link, title, tags }: ContentInputType, id: string|Types.ObjectId) {
        try {
            // Update a content by id
            const tagIds = await this.tagRepository.createTags(tags);
            const content = await Content.findByIdAndUpdate(id, { type: type, link: link, title: title, tags: tagIds });
            if(!content){
                throw new NotFoundError('Content');
            }
            return content.toObject();
        } catch (error) {
            // Handle errors
            console.log(error);
            // Check the error type
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            else if(error instanceof Error){
                if(error.name === 'ValidationError'){
                    // If the error is a validation error, throw a bad request error
                    throw new BadRequestError(error.message);
                }
                else if(error.name === 'MongoServerError'){
                    // If the error is a duplicate key error, throw a conflict error
                    throw new ConflictError('Content');
                }
            }
            throw new InternalServerError();
        }
    }

    async deleteById(id: string|Types.ObjectId) {
        try {
            // Delete a content by id
            return await Content.findByIdAndDelete(id);
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async findByUserId(userId: string|Types.ObjectId) {
        try {
            // Find a content by userId
            const content = await Content.find({userId: userId}).populate({ path: 'userId', select: '-password' }).populate('tags');
            return content.map(content => content.toObject());
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }
}

export default ContentRepository;
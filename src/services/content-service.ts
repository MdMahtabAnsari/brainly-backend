import ContentRepository from "../repositories/content-repository";
import AppError from "../utils/errors/app-error";
import InternalServerError from "../utils/errors/internal-server-error";
import NotFoundError from "../utils/errors/not-found-error";
import UnauthorizedError from "../utils/errors/unauthorized-error";
import {ContentInputType} from "../utils/zod-schema/content-zod-schema";


class ContentService {
    private contentRepository: ContentRepository;

    constructor() {
        this.contentRepository = new ContentRepository();
    }

    async create(contentData: ContentInputType, userId: string) {
        try {
            // Create a new content
            const content =  await this.contentRepository.create(contentData, userId);
            // Return the content with the user and tags populated
            return this.contentRepository.findById(content._id);
        } catch (error) {
            // Handle errors
            console.log(error);
           if(error instanceof AppError){
               // If the error is an app error, rethrow it
               throw error;
           }
              throw new InternalServerError();
        }
    }

    async findById(id: string) {
        try {
            // Find a content by id
            return await this.contentRepository.findById(id);
        } catch (error) {
            // Handle errors
            console.log(error);
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            throw new InternalServerError();
        }
    }

    async findUserContent(userId: string) {
        try {
            // Find all content by userId
            return await this.contentRepository.findByUserId(userId);
        } catch (error) {
            // Handle errors
            console.log(error);
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            throw new InternalServerError();
        }
    }
    async deleteContent(id: string,userId:string) {
        try {
            // Delete a content by id
            const content = await this.contentRepository.findById(id);
            if(!content){
                throw new NotFoundError('Content');
            }
            if(!content.userId || content.userId.toString() !== userId){
                throw new UnauthorizedError("You are not authorized to delete this content");
            }
            return await this.contentRepository.deleteById(id);
        } catch (error) {
            // Handle errors
            console.log(error);
            if(error instanceof AppError){
                // If the error is an app error, rethrow it
                throw error;
            }
            throw new InternalServerError();
        }
    }
}

export default ContentService;


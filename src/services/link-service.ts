import LinkRepository from "../repositories/link-repository";
import ContentRepository from "../repositories/content-repository";
import InternalServerError from "../utils/errors/internal-server-error";
import UnauthorizedError from "../utils/errors/unauthorized-error";
import NotFoundError from "../utils/errors/not-found-error";
import AppError from "../utils/errors/app-error";
import {nanoid} from "nanoid";

class LinkService{
   private linkRepository;
   private contentRepository;
    constructor(){
         this.linkRepository = new LinkRepository();
            this.contentRepository = new ContentRepository();
    }
    async createLink(userId:string){
        try {
            // Create a new link
            const isLinkCreated = await this.linkRepository.findHashByUserId(userId);
            if(isLinkCreated){
                return isLinkCreated;
            }
            const hash = nanoid(10);
            return await this.linkRepository.create(hash,userId);

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
   async findByHash(hash:string){
         try {
              // Find a link by hash
              const link = await this.linkRepository.findByHash(hash);
              if(!link){
                  throw new NotFoundError('Link');
              }
                return link;
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
   async deleteLink(userId:string){
       try {
           // Delete a link by userId
           const isLinkExist = await this.linkRepository.findHashByUserId(userId);
           if(!isLinkExist) {
               throw new NotFoundError('Link');
           }
           if(!isLinkExist.userId || isLinkExist.userId.toString() !== userId){
                throw new UnauthorizedError("You are not authorized to delete this link");
           }
              return await this.linkRepository.deleteByUserId(userId);

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

   async findHashByUserId(userId:string){
         try {
              // Find a link by userId and return it
             const link = await this.linkRepository.findHashByUserId(userId);
                if(!link){
                    throw new NotFoundError('Link');
                }
                return link;
         }
         catch(error) {
             // Handle errors
             console.log(error);
             if (error instanceof AppError) {
                 // If the error is an app error, rethrow it
                 throw error;
             }
             // Otherwise, throw an internal server error
             throw new InternalServerError
         }
   }
   async findByHashAndGetUserContent(hash:string){
         try {
              // Find a link by hash
              const link = await this.linkRepository.findByHash(hash);
              // Check if the link exists
              if (!link || !link.userId) {
                // If the link does not exist, throw a not found error
                throw new NotFoundError('link');
              }
              // Return the link
             return await this.contentRepository.findByUserId(link.userId.toString());
         } catch (error) {
              // Handle errors
              console.log(error);
              // Check the error type
              if (error instanceof AppError) {
                // If the error is an app error, rethrow it
                throw error;
              }
              // Otherwise, throw an internal server error
              throw new InternalServerError();
         }
   }
}

export default LinkService;
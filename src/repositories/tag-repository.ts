import Tag from "../models/tag-model";
import InternalServerError from "../utils/errors/internal-server-error";
import BadRequestError from "../utils/errors/bad-request-error";
import ConflictError from "../utils/errors/conflict-error";
import AppError from "../utils/errors/app-error";

class TagRepository {
    async create(title: string) {
        try {
            // Create a new tag
            const tag = await Tag.create({ title: title });
            return tag.toObject();

        } catch (error) {
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
                    throw new ConflictError('Tag');
                }
            }
            // If the error is not a validation error or a duplicate key error, throw an internal server error
            throw new InternalServerError();
        }
    }

    async createTags(tags: string[]) {
        try {
            // Create an array of tags
            let tagIds = [];
            for (let tag of tags) {
                // Find a tag by name
                const tagExist = await this.findByName(tag);
                // If the tag does not exist, create a new tag
                if (!tagExist) {
                    const newTag = await this.create(tag);
                    tagIds.push(newTag._id);
                } else {
                    // If the tag exists, add the tag id to the tagIds array
                    tagIds.push(tagExist._id);
                }
            }
            // Return the tag ids
            return tagIds;
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async findByName(title: string) {
        try {
            // Find a tag by name
            const tag = await Tag.findOne({ title: title });
            if(!tag){
                return null;
            }
            return tag.toObject();
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async findById(id: string) {
        try {
            // Find a tag by id
            const tag = await Tag.findById(id);
            if(!tag){
                return null;
            }
            return tag.toObject();
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async deleteById(id: string) {
        try {
            // Delete a tag by id
            return await Tag.findByIdAndDelete(id);
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async deleteByName(title: string) {
        try {
            // Delete a tag by name
            return await Tag.findOneAndDelete({title: title});
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }

    async findAll() {
        try {
            // Find all tags
            const tags = await Tag.find();
            return tags.map(tag => tag.toObject());
        } catch (error) {
            // Handle errors
            console.log(error);
            throw new InternalServerError();
        }
    }
}

export default TagRepository;
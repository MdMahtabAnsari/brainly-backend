import TagRepository from "../repositories/tag-repository";
import InternalServerError from "../utils/errors/internal-server-error";
import AppError from "../utils/errors/app-error";

class TagService {
    private tagRepository: TagRepository;

    constructor() {
        this.tagRepository = new TagRepository();
    }

    async findAll() {
        try {
            // Find all tags
            return await this.tagRepository.findAll();
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

export default TagService;
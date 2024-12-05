import AppError from "./app-error";

class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404);
    }
}

export default NotFoundError;
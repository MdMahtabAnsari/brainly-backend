import AppError from "./app-error";

class ConflictError extends AppError {
    constructor(field: string) {
        super(`${field} already exists`, 409);
    }
}

export default ConflictError;
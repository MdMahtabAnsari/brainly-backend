import AppError from "./app-error";

class UnauthorizedError extends AppError {
    constructor(message: string|null = null) {
        super(message || 'Unauthorized', 401);

    }
}

export default UnauthorizedError;
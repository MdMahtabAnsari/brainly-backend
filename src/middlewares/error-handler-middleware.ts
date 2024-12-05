import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/errors/app-error';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError){
        res.status(err.statusCode).json({
            message: err.message,
            success: false,
            data: {},
            error: err.status
        });
    }
    else{
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            data: {},
            error: "error",
        });
    }

}

export default errorHandlerMiddleware;

import {Request,Response,NextFunction} from "express";
import {AnyZodObject} from "zod";
import {fromError} from 'zod-validation-error'
import BadRequestError from "../utils/errors/bad-request-error";

export const bodyValidator = (schema:AnyZodObject)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
           console.log(error);
              const formattedError = fromError(error);
              next(new BadRequestError(formattedError.message));
        }
    }
}

export const paramValidator = (schema:AnyZodObject)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            console.log(error);
            const formattedError = fromError(error);
            next(new BadRequestError(formattedError.message));
        }
    }
}
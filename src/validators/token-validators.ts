import {Request,Response,NextFunction} from "express";
import {CustomRequestType} from "../utils/types/custom-request-type";
import UnauthorizedError from "../utils/errors/unauthorized-error";
import AppError from "../utils/errors/app-error";
import jwt from "jsonwebtoken";
import serverConfig from "../configs/server-config";
import InternalServerError from "../utils/errors/internal-server-error";
import {TokenPayloadType} from "../utils/types/token-payload-type";

export const validateToken = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if(!accessToken || !refreshToken){
            throw new UnauthorizedError("Unauthorized access");
        }
        // verify token
        const accessDecoded = jwt.verify(accessToken,serverConfig.JWT_SECRET!) as TokenPayloadType;
        const refreshDecoded = jwt.verify(refreshToken,serverConfig.JWT_SECRET!) as TokenPayloadType;
        // if token is invalid
        if(!accessDecoded || !refreshDecoded){
            throw new UnauthorizedError("Unauthorized access");
        }
        // if token is valid
        (req as CustomRequestType).user = accessDecoded;
        next();
    }
    catch(error){
       // if token is invalid
        console.log(error);
        if(error instanceof AppError){
            // if the error is an app error, rethrow it
            next(error);
        }
        // if token is invalid
        next(new InternalServerError());
    }

}

export const validateRefreshToken = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            throw new UnauthorizedError("Unauthorized access");
        }
        // verify token
        const refreshDecoded = jwt.verify(refreshToken,serverConfig.JWT_SECRET!) as TokenPayloadType;
        // if token is invalid
        if(!refreshDecoded){
            throw new UnauthorizedError("Unauthorized access");
        }
        // if token is valid
        (req as CustomRequestType).user = refreshDecoded;
        next();
    }
    catch(error){
        // if token is invalid
        console.log(error);
        if(error instanceof AppError){
            // if the error is an app error, rethrow it
            next(error);
        }
        // if token is invalid
        next(new InternalServerError());
    }

}
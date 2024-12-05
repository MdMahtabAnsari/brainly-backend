import TokenService from "../services/token-service";
const tokenService = new TokenService();
import {CustomRequestType} from "../utils/types/custom-request-type";
import {Response} from "express";
import {cookieConfigGenerator} from "../utils/cookies/cookie-config";
import AppError from "../utils/errors/app-error";


const refreshToken = async (req:CustomRequestType,res:Response)=>{
    try {
       const token = req.cookies.refreshToken;
       const userDetails = req.user;
       const tokenResponse = await tokenService.generateAccessToken(userDetails!,token);
        res.cookie('accessToken',tokenResponse.accessToken,cookieConfigGenerator({type:'accessToken',sameSite:'strict'})).status(200).json({
            message: "Token created successfully",
            success: true,
            data: tokenResponse.user,
            error: {}
        });
    }
    catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {},
                error: error.status
            });
        } else {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                success: false,
                data: {},
                error: "error",
            });
        }
    }

}

export {
    refreshToken
}
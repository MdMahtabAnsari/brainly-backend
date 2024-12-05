import UserService from "../services/user-service";
import {Response,Request} from "express";
import AppError from "../utils/errors/app-error";
import {cookieConfigGenerator} from "../utils/cookies/cookie-config";
const userService = new UserService();

const signUp = async (req:Request,res:Response)=>{
    try {
        const {username,password} = req.body;
        const user = await userService.signUp({username,password});
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: user,
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

const signIn = async (req:Request,res:Response)=>{
    try {
        const {username,password} = req.body;
        const user = await userService.signIn({username,password});
        res.cookie('accessToken',user.accessToken,cookieConfigGenerator({type:'accessToken',sameSite:'strict'}))
            .cookie('refreshToken',user.refreshToken,cookieConfigGenerator({type:'refreshToken',sameSite:'strict'})).status(200)
            .json({
            message: "User signed in successfully",
            success: true,
            data: user.user,
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
    signUp,
    signIn
}

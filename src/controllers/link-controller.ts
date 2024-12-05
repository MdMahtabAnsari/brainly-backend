import LinkService from "../services/link-service";
import {Request, Response} from "express";
import {CustomRequestType} from "../utils/types/custom-request-type";
import AppError from "../utils/errors/app-error";
const linkService = new LinkService();


const createLink = async (req:CustomRequestType,res:Response)=>{
    try {
        const userId = req.user!._id;
        const link = await linkService.createLink(userId);
        res.status(201).json({
            message: "Link created successfully",
            success: true,
            data: link,
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

const deleteLink = async (req:CustomRequestType,res:Response)=>{
    try {
        const userId = req.user!._id;
        await linkService.deleteLink(userId);
        res.status(200).json({
            message: "Link deleted successfully",
            success: true,
            data: {},
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

const getLink = async (req:Request,res:Response)=>{
    try {
       const userId = req.params.userId;
        const link = await linkService.findHashByUserId(userId);
        res.status(200).json({
            message: "Link fetched successfully",
            success: true,
            data: link,
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

const getLinkContentByHash = async (req:Request,res:Response)=>{
    try {
        const hash = req.params.hash;
        const content = await linkService.findByHashAndGetUserContent(hash);
        res.status(200).json({
            message: "Link fetched successfully",
            success: true,
            data: content,
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
    createLink,
    deleteLink,
    getLink,
    getLinkContentByHash
}
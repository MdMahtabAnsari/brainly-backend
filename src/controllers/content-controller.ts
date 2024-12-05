import ContentService from "../services/content-service";
import {Response} from "express";
import {CustomRequestType} from "../utils/types/custom-request-type";
import AppError from "../utils/errors/app-error";
const contentService = new ContentService();

const createContent = async (req:CustomRequestType,res:Response)=>{
    try {
        const {type,link,title,tags} = req.body;
        console.log(req.body);
        const userId = req.user!._id;
        const content = await contentService.create({type,link,title,tags},userId);
        res.status(201).json({
            message: "Content created successfully",
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

const getUserContent = async (req:CustomRequestType,res:Response)=>{
    try {
        const userId = req.user!._id;
        const content = await contentService.findUserContent(userId);
        res.status(200).json({
            message: "Content fetched successfully",
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

const deleteUserContent = async (req:CustomRequestType,res:Response)=>{
    try {
        const id = req.params.id;
        const userId = req.user!._id;
        const content = await contentService.deleteContent(id,userId);
        res.status(200).json({
            message: "Content deleted successfully",
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
    createContent,
    getUserContent,
    deleteUserContent
}
import TagService from "../services/tag-service";
import {Request, Response} from "express";
import AppError from "../utils/errors/app-error";
const tagService = new TagService();

const getTags = async (req:Request,res:Response)=>{
    try {
        const tags = await tagService.findAll()
        res.status(200).json({
            message: "Tags fetched successfully",
            success: true,
            data: tags,
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
    getTags
}
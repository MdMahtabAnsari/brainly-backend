import {Request} from "express";

export interface CustomRequestType extends Request {
user?: {
    username: string;
    _id: string;
}
}

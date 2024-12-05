import userRouter from "./user-route";
import contentRouter from "./content-route";
import tokenRouter from "./token-route";
import linkRouter from "./link-route";
import tagRouter from "./tag-route";
import {Express} from "express";
import errorHandlerMiddleware from "../middlewares/error-handler-middleware";

const routes = (app:Express)=>{
    app.use('/api/v1/users',userRouter);
    app.use('/api/v1/contents',contentRouter);
    app.use('/api/v1/tokens',tokenRouter);
    app.use('/api/v1/links',linkRouter);
    app.use('/api/v1/tags',tagRouter);
    app.use(errorHandlerMiddleware);
}

export default routes;